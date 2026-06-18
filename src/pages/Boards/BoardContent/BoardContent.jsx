import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn';
import { mapOrder } from '../../../utils/fomatter';
import { DragDropProvider, DragOverlay } from '@dnd-kit/react';
import { defaultPreset, PointerSensor, PointerActivationConstraints } from '@dnd-kit/dom';
import { useEffect, useRef, useState } from 'react';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { arrayMove } from '@dnd-kit/sortable';
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TPYE_CARD'
}
const DROP_ANIMATION_DURATION = 300

const reorderCardsInColumn = (cards, activeCardId, overIndex) => {
  const oldIndex = cards.findIndex((card) => card._id === activeCardId)
  if (oldIndex === -1) return cards

  const newIndex = Number.isInteger(overIndex)
    ? Math.min(Math.max(overIndex, 0), cards.length - 1)
    : oldIndex
  if (oldIndex === newIndex) return cards

  return arrayMove(cards, oldIndex, newIndex)
}

const BoardContent = ({ board, createNewColumn, createNewCard }) => {
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [activeDragItemIndex, setActiveDragItemIndex] = useState(null)
  const [orderedColumns, setOrderedColumns] = useState([])
  const clearDragStateTimeoutRef = useRef(null)
  const lastDragOverSignatureRef = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  useEffect(() => {
    return () => {
      if (clearDragStateTimeoutRef.current) clearTimeout(clearDragStateTimeoutRef.current)
    }
  }, [])

  const sensors = [
    PointerSensor.configure({
      activationConstraints: [
        new PointerActivationConstraints.Distance({ value: 5 }),
        new PointerActivationConstraints.Delay({
          value: 300,
          tolerance: { x: 10, y: 5 },
        }),
      ]
    }),
  ]

  const handleDragStart = (event) => {
    if (clearDragStateTimeoutRef.current) {
      clearTimeout(clearDragStateTimeoutRef.current)
      clearDragStateTimeoutRef.current = null
    }
    setActiveDragItemId(event?.operation?.source?.id)
    setActiveDragItemType(event?.operation?.source?.data?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD :
      ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.operation?.source?.data)
    setActiveDragItemIndex(
      typeof event?.operation?.source?.index === 'number' ? event.operation.source.index : null
    )
  }

  const handleDragOver = (event) => {
    // Use operation source type (not React state) so logic never runs stale on first drag frames.
    const { source, target } = event?.operation || {}
    if (source?.type !== 'card') return
    const fromColumnId = source?.group || source?.initialGroup
    const toColumnId = target?.group ?? (target?.type === 'column' ? target?.id : undefined)
    const overIndex = target?.index
    const activeCard = source?.data

    if (!source?.id || !fromColumnId || !toColumnId || !activeCard) return

    const dragOverSignature = `${source.id}|${fromColumnId}|${toColumnId}|${overIndex}`
    if (lastDragOverSignatureRef.current === dragOverSignature) return
    lastDragOverSignatureRef.current = dragOverSignature

    setOrderedColumns(pre => {
      const nextColumns = cloneDeep(pre)
      const nextActiveColumn = nextColumns.find(column => column._id === fromColumnId)
      const nextOverColumn = nextColumns.find(column => column._id === toColumnId)
      if (!nextActiveColumn || !nextOverColumn) return pre

      if (fromColumnId === toColumnId) {
        const reorderedCards = reorderCardsInColumn(
          nextActiveColumn.cards,
          source.id,
          overIndex
        )
        if (reorderedCards === nextActiveColumn.cards) return pre
        nextActiveColumn.cards = reorderedCards
        nextActiveColumn.cardOrderIds = reorderedCards.map(card => card._id)
        return nextColumns
      }

      // xoa card o column dang keo theo group hien tai
      nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== source.id)
      nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)

      // chen card vao column dang hover
      const nextActiveCard = { ...activeCard, columnId: toColumnId }
      nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== source.id)
      const insertIndex = Number.isInteger(overIndex) ? overIndex : nextOverColumn.cards.length
      nextOverColumn.cards.splice(insertIndex, 0, nextActiveCard)
      nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

      return nextColumns
    })
  }

  const handleDragEnd = (event) => {
    lastDragOverSignatureRef.current = null
    // 1. Lấy trạng thái hủy và thông tin operation từ event
    const { canceled, operation } = event;
    // 2. Nếu người dùng hủy thao tác kéo thả thì dừng lại
    if (canceled) return;
    // 3. Lấy source và target từ operation
    const { source } = operation;
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      const { initialIndex, index: newIndex } = source
      const dndOrderedColumns = arrayMove(orderedColumns, initialIndex, newIndex)
      setOrderedColumns(dndOrderedColumns)
    } else if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const initialGroup = source?.initialGroup
      const group = source?.group
      const { initialIndex, index: newIndex, id: cardId } = source
      // Cross-column moves are applied in onDragOver; only finalize same-column order here.
      if (
        initialGroup &&
        initialGroup === group &&
        cardId &&
        typeof initialIndex === 'number' &&
        typeof newIndex === 'number' &&
        initialIndex !== newIndex
      ) {
        setOrderedColumns(pre => {
          const nextColumns = cloneDeep(pre)
          const column = nextColumns.find(col => col._id === group)
          if (!column) return pre
          const reorderedCards = reorderCardsInColumn(column.cards, cardId, newIndex)
          if (reorderedCards === column.cards) return pre
          column.cards = reorderedCards
          column.cardOrderIds = reorderedCards.map(card => card._id)
          return nextColumns
        })
      }
    }
    clearDragStateTimeoutRef.current = setTimeout(() => {
      setActiveDragItemId(null)
      setActiveDragItemType(null)
      setActiveDragItemData(null)
      setActiveDragItemIndex(null)
      clearDragStateTimeoutRef.current = null
    }, DROP_ANIMATION_DURATION)
  }
  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      plugins={defaultPreset.plugins}>
      <Box sx={(theme => ({
        height: theme.trello.boardContentHeight,
        width: '100%',
        display: 'flex',
        p: '10px 10px 10px 0',
        bgcolor: '#1976d2',
        ...theme.applyStyles('dark', {
          bgcolor: '#34495e'
        })
      }))}>
        <ListColumn
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
        <DragOverlay dropAnimation={{ duration: DROP_ANIMATION_DURATION, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)', }}>
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} isOverLay />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) &&
            <Card
              card={activeDragItemData}
              columnId={activeDragItemData.columnId}
              index={activeDragItemIndex ?? 0}
              isOverLay
            />
          }
        </DragOverlay>
      </Box>
    </DragDropProvider>
  )
}
export default BoardContent