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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import lizar from '~/assets/lizar.jpg'
const HEADER_HEIGHT = '50px'
const FOOTER_HEIGHT = '50px'
const BoardContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={(theme => ({
        height: theme.trello.boardContentHeight,
        width: '100%',
        display: 'flex',
        p: '10px 0',
        bgcolor: '#1976d2',
        ...theme.applyStyles('dark', {
          bgcolor: '#34495e'
        })
      }))}>
        <Box sx={{
          width: '100%',
          height: '100%',
          bgcolor: 'inherit',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          "&::-webkit-scrollbar-track": {
            m: 2
          },
        }}>
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
            <Box sx={{
              height: HEADER_HEIGHT,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingX: 2
            }}>
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: '0 5px',
                m: '0 5px',
                gap: 1,
                overflowX: 'hidden',
                overflowY: 'auto',
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#ced0da",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#bfc2cf",
                },
                maxHeight: (theme => (
                  `calc(${theme.trello.boardContentHeight} - 
                ${theme.spacing(5)} -
                ${HEADER_HEIGHT} - ${FOOTER_HEIGHT}) `
                )),

              }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={lizar}
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >TruongLamDev</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                  <Button startIcon={<PeopleAltIcon />} size="small">15</Button>
                  <Button startIcon={<CommentIcon />} size="small">25</Button>
                  <Button startIcon={<AttachmentIcon />} size="small">25</Button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>

            </Box>
            {/* Box column footer */}
            <Box
              sx={{
                height: FOOTER_HEIGHT,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingX: 2
              }}
            >
              <Button startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title='Drag to move' sx={{ cursor: 'pointer' }}>
                <DragHandleIcon />
              </Tooltip>
            </Box>
          </Box>
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
            <Box sx={{
              height: HEADER_HEIGHT,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingX: 2
            }}>
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: '0 5px',
                m: '0 5px',
                gap: 1,
                overflowX: 'hidden',
                overflowY: 'auto',
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#ced0da",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#bfc2cf",
                },
                maxHeight: (theme => (
                  `calc(${theme.trello.boardContentHeight} - 
                ${theme.spacing(5)} -
                ${HEADER_HEIGHT} - ${FOOTER_HEIGHT}) `
                )),

              }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                  overflow: 'unset'
                }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={lizar}
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >TruongLamDev</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                  <Button startIcon={<PeopleAltIcon />} size="small">15</Button>
                  <Button startIcon={<CommentIcon />} size="small">25</Button>
                  <Button startIcon={<AttachmentIcon />} size="small">25</Button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345, cursor: 'pointer', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)', overflow: 'unset' }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
                  <Typography >Card 01</Typography>
                </CardContent>
              </Card>

            </Box>
            {/* Box column footer */}
            <Box
              sx={{
                height: FOOTER_HEIGHT,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingX: 2
              }}
            >
              <Button startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title='Drag to move' sx={{ cursor: 'pointer' }}>
                <DragHandleIcon />
              </Tooltip>
            </Box>
          </Box>
        </Box>


      </Box>
    </>
  )
}

export default BoardContent