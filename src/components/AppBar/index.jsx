import Box from "@mui/material/Box"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Button from "@mui/material/Button";
import AppsIcon from '@mui/icons-material/Apps';
import { SvgIcon } from "@mui/material";
import Typography from '@mui/material/Typography';
import TrelloIcon from '~/assets/trello.svg?react'
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Started from "./Menus/Started";
import Template from "./Menus/Template";
import Profiles from "./Menus/Profiles";
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddIcon from '@mui/icons-material/Add';
const AppBar = () => {
  return (
    <>
      <Box px={2} sx={{
        height: (theme) => theme.trello.headerHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        overflowX: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}>
          <AppsIcon sx={{ color: 'primary.main' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }} />
            <Typography component='span' sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.2rem', }}>
              Trello
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1}}>
            <Workspaces />
            <Recent />
            <Started />
            <Template />
            <Button variant="outlined" startIcon={<AddIcon />}>Create</Button>
          </Box>

        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField id="outlined-search" label="Search field" type="search" size="small" />
          <Brightness4Icon />
          <Tooltip title="Notifications">
            <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
          </Tooltip>
          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar