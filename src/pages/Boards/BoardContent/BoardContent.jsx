import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn';
import { mapOrder } from '../../../utils/fomatter';
import { DragDropProvider, DragOverlay } from '@dnd-kit/react';
import { defaultPreset, PointerSensor, PointerActivationConstraints } from '@dnd-kit/dom';
import { useState } from 'react';
import { defaultDropAnimationSideEffects } from '@dnd-kit/core';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TPYE_CARD'
}


const BoardContent = ({ board }) => {
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  // const dropAnimationConfig = {
  //   duration: 400,
  //   easing: 'cubic-bezier(0.18, 0.67, 0.6, 1)',
  //   sideEffects: defaultDropAnimationSideEffects({
  //     styles: {
  //       active: {
  //         opacity: '1',
  //       },
  //     },
  //   }),
  // };
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
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.operation?.source?.id)
    setActiveDragItemType(event?.operation?.source?.data?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD :
      ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.operation?.source?.data)
  }

  const handleDragEnd = (event) => {
    // 1. Lấy trạng thái hủy và thông tin operation từ event
    const { canceled, operation } = event;

    // 2. Nếu người dùng hủy thao tác kéo thả thì dừng lại
    if (canceled) return;
    // 3. Lấy source và target từ operation
    const { source } = operation;

    // const initialIndex = source?.sortable?.initialIndex; // Vị trí cũ
    // const newIndex = source?.sortable?.index;
    // setActiveDragItemId(null)
    // setActiveDragItemType(null)
    // setActiveDragItemData(null)
  }
  return (
    <DragDropProvider
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
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
        <DragOverlay >
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) &&
            <Card card={activeDragItemData} columnId={activeDragItemData.columnId} />
          }
        </DragOverlay>
      </Box>
    </DragDropProvider>
  )
}
export default BoardContent