import React from 'react'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentPaste from '@mui/icons-material/ContentPaste';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Cloud from '@mui/icons-material/Cloud';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Button from '@mui/material/Button';
import ListCards from './ListCards/ListCards';

const Column = () => {
   const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={(theme => ({
      minWidth: '300px',
      maxWidth: '300px',
      borderRadius: '8px',
      ml: 2,
      height: 'fit-content',
      bgcolor: '#ebecf0',
      maxHeight: `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} )`,
      ...theme.applyStyles('dark', {
        bgcolor: '#333643'
      })
    }))}>
      {/* Box column Header */}
      <Box sx={theme => ({
        height: theme.trello.columnHeaderHeight,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingX: 2
      })}>
        <Typography variant='h6' sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Column Title</Typography>
        <Tooltip title='More Options' >
          <IconButton
            id="basic-column-dropdown"
            aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ cursor: 'pointer', px: 0 }}>
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
        <Menu id="basic-menu-column-dropdown"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-column-dropdown',
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AddCardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add new card</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
          </MenuItem>

          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Remove this column</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Archive this column</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {/* Box column list card */}
      <ListCards />
      {/* Box column footer */}
      <Box
        sx={theme => ({
          height: theme.trello.columnFooterHeight,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingX: 2
        })}
      >
        <Button startIcon={<AddCardIcon />}>Add new card</Button>
        <Tooltip title='Drag to move' sx={{ cursor: 'pointer' }}>
          <DragHandleIcon />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column