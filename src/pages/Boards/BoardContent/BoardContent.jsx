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

const BoardContent = ({ board }) => {
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
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
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // logic xu ly keo tha card qua lai cac column
    const { source, target } = event?.operation || {}
    const fromColumnId = source?.group || source?.initialGroup
    const toColumnId = target?.group
    const overIndex = target?.index
    const activeCard = source?.data

    if (!source?.id || !fromColumnId || !toColumnId || !activeCard) return
    // logic xu ly khi keo tha card qua lai cung column
    if (fromColumnId === toColumnId) {
      return
    }
    // logic xu ly khi keo tha card qua lai cac column khac nhau
    const dragOverSignature = `${source.id}|${fromColumnId}|${toColumnId}|${overIndex}`
    if (lastDragOverSignatureRef.current === dragOverSignature) return
    lastDragOverSignatureRef.current = dragOverSignature

    setOrderedColumns(pre => {
      const nextColumns = cloneDeep(pre)
      const nextActiveColumn = nextColumns.find(column => column._id === fromColumnId)
      const nextOverColumn = nextColumns.find(column => column._id === toColumnId)
      if (!nextActiveColumn || !nextOverColumn) return pre

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
    }
    clearDragStateTimeoutRef.current = setTimeout(() => {
      setActiveDragItemId(null)
      setActiveDragItemType(null)
      setActiveDragItemData(null)
      clearDragStateTimeoutRef.current = null
    }, DROP_ANIMATION_DURATION)
  }
  console.log('orderedColumns', orderedColumns)
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
        p: '10px 0',
        bgcolor: '#1976d2',
        ...theme.applyStyles('dark', {
          bgcolor: '#34495e'
        })
      }))}>
        <ListColumn columns={orderedColumns} />
        <DragOverlay dropAnimation={{ duration: DROP_ANIMATION_DURATION, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)', }}>
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} isOverLay />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) &&
            <Card card={activeDragItemData} columnId={activeDragItemData.columnId} isOverLay />
          }
        </DragOverlay>
      </Box>
    </DragDropProvider>
  )
}
export default BoardContent