import React from 'react'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'

const PageLoadingSpinner = ({ caption }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '20px'
      }}>
      <CircularProgress size="3rem" aria-label="Loading…" />
      <Typography>{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner