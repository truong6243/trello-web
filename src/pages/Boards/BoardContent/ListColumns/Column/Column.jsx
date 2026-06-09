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
import { mapOrder } from '../../../../../utils/fomatter';
import { useSortable } from '@dnd-kit/react/sortable';
import { CollisionPriority } from '@dnd-kit/abstract';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

const Column = ({ column, index, isOverLay }) => {
  const [openNewCardForm, setopenNewCardForm] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const toggleOpenNewCardForm = () => setopenNewCardForm(!openNewCardForm)
  const addNewCard = () => {
    if (!newCardTitle) return
    // goi API
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  const sortable = useSortable({
    id: column._id,
    index: index,
    data: { ...column },
    collisionPriority: CollisionPriority.Low,
    accept: ['column', 'card'],
    type: 'column',
    disabled: isOverLay
  });
  const dndkitStyle = !isOverLay ? {
    transform: sortable.transform
      ? `translate3d(${sortable.transform.x}px, ${sortable.transform.y}px, 0)`
      : undefined,
    transition: sortable.transition,
    opacity: sortable.isDragging || sortable.isDropping ? 0.5 : undefined,
    touchAction: 'none',
    userSelect: 'none',
  } : {};

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      style={dndkitStyle}
      ref={isOverLay ? null : sortable.ref}
      sx={(theme => ({
        minWidth: '300px',
        maxWidth: '300px',
        borderRadius: '8px',
        ml: isOverLay ? '0' : 2,
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
        <Typography variant='h6' sx={{ fontWeight: 'bold', fontSize: '1rem' }}> {column.title} </Typography>
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
      <ListCards cards={orderedCards} column={column} />
      {/* Box column footer */}
      <Box
        sx={theme => ({
          height: theme.trello.columnFooterHeight,
          paddingX: 2
        })}
      >
        {
          !openNewCardForm
            ? <Box sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button onClick={toggleOpenNewCardForm} startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title='Drag to move' sx={{ cursor: 'pointer' }}>
                <DragHandleIcon />
              </Tooltip>
            </Box>
            : <Box sx={{display: 'flex', gap: 2}}>
              <TextField
                label="Enter column title..."
                type="text"
                size="small"
                variant='outlined'
                autoFocus
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  maxWidth: '250px',
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  onClick={addNewCard}
                  variant='contained' color='success' size='small'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                >Add</Button>
                <CloseIcon
                  onClick={toggleOpenNewCardForm}
                  fontSize="small"
                  sx={{
                    cursor: 'pointer',
                    color: theme => theme.palette.warning.light
                  }} />
              </Box>
            </Box>
        }

      </Box>
    </Box>
  )
}

export default Column