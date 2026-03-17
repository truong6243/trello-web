import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import theme from './theme'

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{
      backgroundColor: 'primary.main'
    }}>
      <Box sx={{
        backgroundColor: 'primary.light',
        height: (theme) => theme.trello.headerHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        Header
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        height: (theme) => theme.trello.boardBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Bar
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        height: `calc(100vh - ${theme.trello.headerHeight} - ${theme.trello.boardBarHeight})`,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Content
      </Box>
    </Container>
  )
}

export default App
