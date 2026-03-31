import Box from "@mui/material/Box"
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
import ModeSelect from "../ModeSelect";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
const AppBar = () => {
  const [inputSearch, setInputSearch] = useState('')
  return (
    <>
      <Box px={2} sx={(theme => ({
        height: theme.trello.appbarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        overflowX: 'auto',
        bgcolor: '#1565c0',
        "&::-webkit-scrollbar-track": {
          m: 2
        },
        ...theme.applyStyles('dark', {
          bgcolor: '#2c3e50'
        })
      }))}>
        <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}>
          <AppsIcon sx={{ color: 'white' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'white' }} />
            <Typography component='span' sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', }}>
              Trello
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Started />
            <Template />
            <Button sx={{ color: 'white' }} startIcon={<AddIcon />}>Create</Button>
          </Box>

        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            id="outlined-search"
            label="Search field"
            type="text"
            size="small"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <CloseIcon
                    onClick={() => setInputSearch('')}
                    fontSize="small"
                    sx={{
                      color: (inputSearch ? 'white' : 'transparent'),
                      cursor: 'pointer',

                    }} />
                )
              },
            }}
            sx={{
              minWidth: '120px',
              maxWidth: '180px',
              '& label': {
                color: 'white'
              },
              '& label.Mui-focused': {
                color: 'white'
              },
              '& input': {
                color: 'white'
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              }
            }}
          />
          <ModeSelect />
          <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon sx={{ color: 'white' }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
          </Tooltip>
          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar