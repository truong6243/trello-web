import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
const BoardContent = () => {
  const theme = useTheme()
  return (
    <>
      <Box sx={(theme => ({
        height: `calc(100vh - ${theme.trello.headerHeight} - ${theme.trello.boardBarHeight})`,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#1976d2',
        ...theme.applyStyles('dark', {
          bgcolor: '#34495e'
        })
      }))}>
        Board Content
      </Box>
    </>
  )
}

export default BoardContent