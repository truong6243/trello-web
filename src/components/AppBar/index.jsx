import Box from "@mui/material/Box"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AppsIcon from '@mui/icons-material/Apps';
import { SvgIcon } from "@mui/material";
 import TrelloIcon from '~/assets/trello.svg?react'
const AppBar = () => {
  return (
    <>
      <Box px = {2} sx={{
        backgroundColor: 'primary.light',
        height: (theme) => theme.trello.headerHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        
      }}>
        <Box >
          <AppsIcon sx={{ color: 'primary.main'}} />
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main'}} />
        </Box>
        <Brightness4Icon />
      </Box>
    </>
  )
}

export default AppBar