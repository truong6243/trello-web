import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify'

const ListColumn = ({ columns, createNewColumn, createNewCard, deleteColumnDetails }) => {
  const [openNewColumnForm, setopenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleOpenNewColumnForm = () => setopenNewColumnForm(!openNewColumnForm)
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter Column Title!')
      return
    }
    // goi API
    await createNewColumn({ title: newColumnTitle })
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      bgcolor: 'inherit',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      p: 0,
      "&::-webkit-scrollbar-track": {
        m: 2
      },
    }}>
      {columns?.map((column, index) => <Column key={column._id} column={column} index={index} createNewCard={createNewCard} deleteColumnDetails={deleteColumnDetails} />)}

      {/* Add new column */}
      {!openNewColumnForm
        ? <Box onClick={toggleOpenNewColumnForm} sx={{
          maxWidth: '250px',
          minWidth: '250px',
          height: 'fit-content',
          bgcolor: '#ffffff3d',
          borderRadius: '6px',
          ml: 2
        }}
        >
          <Button sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }} startIcon={<NoteAddIcon />}>Add new column</Button>
        </Box>
        : <Box sx={{
          minWidth: '250px',
          maxWidth: '250px',
          mx: 2,
          p: 1,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: 'ffffff3d',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          <TextField
            label="Enter column title..."
            type="text"
            size="small"
            variant='outlined'
            autoFocus
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            sx={{
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              onClick={addNewColumn}
              variant='contained' color='success' size='small'
              sx={{
                boxShadow: 'none',
                border: '0.5px solid',
                borderColor: (theme) => theme.palette.success.main,
                '&:hover': { bgcolor: (theme) => theme.palette.success.main }
              }}
            >Add Column</Button>
            <CloseIcon
              onClick={toggleOpenNewColumnForm}
              fontSize="small"
              sx={{
                color: 'white',
                cursor: 'pointer',
                '&:hover': { color: theme => theme.palette.warning.light }
              }} />
          </Box>
        </Box>
      }
    </Box>
  )
}

export default ListColumn