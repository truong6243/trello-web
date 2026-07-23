import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import myAvatar from '~/assets/avatar.jpg'
import { ListItemIcon } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux'
import { useConfirm } from 'material-ui-confirm'
import { logoutUserApi, selectorCurrentUser } from '~/redux/user/userSlice'

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()
  const currentUser = useSelector(selectorCurrentUser)

  const confirmLogout = useConfirm()
  const handleLogout = async () => {
    const { confirmed } = await confirmLogout({
      description: `This will permanently delete column and cards`,
    });
    if (confirmed) {
      dispatch(logoutUserApi())
    }
  }
  return (
    <div>
      <Button
        id="basic-button-profiles"
        aria-controls={open ? 'basic-menu-profiles' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ padding: 0 }}
      >
        <Avatar
          sx={{ width: 36, height: 36 }}
          alt='TruongLamDev'
          src={currentUser?.avatar}
        />
      </Button>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button-profiles',
          },
        }}
      >
        <MenuItem sx={{
          '&:hover': { color: 'success.light' }
        }}>
          <Avatar
            sx={{ width: 28, height: 28, mr: 2 }}
            src={currentUser?.avatar}
          /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAddIcon fontSize='small' />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize='small' />
          </ListItemIcon>
          Setting
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{
          '&:hover': {
            color: 'warning.dark',
            '.logout-icon': { color: 'warning.dark' }
          }
        }}>
          <ListItemIcon>
            <LogoutIcon className='logout-icon' fontSize='small' />
          </ListItemIcon>
          Log out
        </MenuItem>

      </Menu>
    </div>
  );
}
export default Profiles