import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useColorScheme } from '@mui/material';
const ModeSelect = () => {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    setMode(event.target.value);
  };
  if (!mode) {
    return null;
  }
  return (
    <FormControl sx={{ minWidth: 120 }} size='small'>
      <InputLabel
        id="label_dark_light_mode"
        sx={{
          color: 'white',
          '&.Mui-focused ': {color: 'white'}
        }}>
        Mode </InputLabel>
      <Select
        labelId="label_dark_light_mode"
        id="dark_light_mode"
        value={mode}
        label="mode"
        onChange={handleChange}
        sx={{ 
          color: 'white',
          '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
          '.MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
          '.MuiSvgIcon-root ': {color: 'white'}
        }}
      >

        <MenuItem value='light'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LightModeIcon fontSize='small' /> Light
          </div>
        </MenuItem>
        <MenuItem value='dark'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DarkModeIcon fontSize='small' /> Dark
          </div>
        </MenuItem>
        <MenuItem value='system'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsBrightnessIcon fontSize='small' /> System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect 