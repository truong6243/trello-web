import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Card as MuiCard} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import lizar from '~/assets/lizar.jpg'
const Card = () => {
  return (
    <MuiCard
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
      </MuiCard>
  )
}

export default Card