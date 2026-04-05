import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn';
import { mapOrder } from '../../../utils/fomatter';
import { DragDropProvider } from '@dnd-kit/react';
import { PointerSensor, PointerActivationConstraints } from '@dnd-kit/dom';

const BoardContent = ({ board }) => {
  const sensors = [
    PointerSensor.configure({
      activationConstraints: [
        // Start dragging after moving 5px
        new PointerActivationConstraints.Distance({ value: 200 }),
        // Or after holding for 200ms with 10px tolerance
        new PointerActivationConstraints.Delay({ value: 200, tolerance: 10 }),
      ],
    }),
  ]
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  const handleDragEnd = (event) => {
    console.log('Drag ended:', event);
    // 1. Lấy trạng thái hủy và thông tin operation từ event
    const { canceled, operation } = event;

    // 2. Nếu người dùng hủy thao tác kéo thả thì dừng lại
    if (canceled) return;
    // 3. Lấy source và target từ operation
    const { source } = operation;

    const initialIndex = source?.sortable?.initialIndex; // Vị trí cũ
    const newIndex = source?.sortable?.index;

    // console.log('ID đang kéo:', initialIndex);
    // console.log('ID thả xuống:', newIndex);

    // (Tùy chọn) Xử lý logic cập nhật state 
  }
  return (
    <DragDropProvider onDragEnd={handleDragEnd} sensors={sensors}>
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
      </Box>
    </DragDropProvider>
  )
}
export default BoardContent