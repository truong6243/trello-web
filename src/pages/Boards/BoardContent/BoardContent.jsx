import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn';
import { mapOrder } from '../../../utils/fomatter';
const BoardContent = ({board}) => {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <>
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
        <ListColumn columns = {orderedColumns} />
      </Box>
    </>
  )
}

export default BoardContent