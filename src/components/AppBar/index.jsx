import  Box  from "@mui/material/Box"
const AppBar = () => {
  return (
    <>
      <Box sx={{
        backgroundColor: 'primary.light',
        height: (theme) => theme.trello.headerHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        App Bar
      </Box>
    </>
  )
}

export default AppBar