import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import PublicIcon from '@mui/icons-material/Public';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { capitallizeFirstLetter } from '../../../utils/fomatter';
import BoardUserGroup from '~/pages/Boards/BoardBar/BoardUserGroup'

const BoardBar = ({ board }) => {
  const MENU_STYLE = {
    color: 'white',
    bgcolor: 'transparant',
    border: 'none',
    paddingX: 1,
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
  }
  return (
    <>
      <Box sx={(theme => ({
        height: theme.trello.boardBarHeight,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid white',
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: '#1976d2',
        "&::-webkit-scrollbar-track": {
          m: 2
        },
        ...theme.applyStyles('dark', {
          bgcolor: '#34495e'
        })
      }))}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Tooltip title={board?.description}>
            <Chip label={board?.title}
              variant="outlined"
              icon={<AutoAwesomeMosaicIcon />}
              clickable
              sx={MENU_STYLE}
            />
          </Tooltip>
          <Chip
            label={capitallizeFirstLetter(board?.type)}
            variant="outlined"
            icon={<PublicIcon />}
            clickable
            sx={MENU_STYLE} />
          <Chip
            label="Add to Google Drive"
            variant="outlined"
            icon={<AddToDriveIcon />}
            clickable
            sx={MENU_STYLE} />
          <Chip
            label="Automation"
            variant="outlined"
            icon={<BoltIcon />}
            clickable
            sx={MENU_STYLE} />
          <Chip
            label="Fillers"
            variant="outlined"
            icon={<AddToDriveIcon />}
            clickable
            sx={MENU_STYLE}
          />

        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            sx={{ color: 'white', borderColor: 'white' }}
            variant="outlined"
            startIcon={<PersonAddAltIcon />}
          >
            Invite
          </Button>
          <BoardUserGroup />
        </Box>
      </Box >
    </>
  )
}

export default BoardBar