import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
const BoardContent = () => {
  const theme = useTheme()
  return (
    <>
      <Box sx={{
        backgroundColor: 'primary.main',
        height: `calc(100vh - ${theme.trello.headerHeight} - ${theme.trello.boardBarHeight})`,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Content
      </Box>
    </>
  )
}

export default BoardContent