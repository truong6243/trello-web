import Box from '@mui/material/Box'
import ListColumn from './ListColumns/ListColumn';

const BoardContent = () => {
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
        <ListColumn />
      </Box>
    </>
  )
}

export default BoardContent