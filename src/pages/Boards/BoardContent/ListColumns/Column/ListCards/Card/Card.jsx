import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { useSortable } from '@dnd-kit/react/sortable';
// import lizar from '~/assets/lizar.jpg'
const Card = ({ card, index, columnId}) => {
  const cardSortable = useSortable({
    id: card._id,
    index: index,
    data: { ...card },
    element: card,
    group: columnId,
    accept: 'card',
    type: 'card',
    feedback: 'clone',

  });
  const dndkitCardStyle = {
    transform: cardSortable.transform
      ? `translate3d(${cardcardSortable.transform.x}px, ${cardSortable.transform.y}px, 0)`
      : undefined,
    transition: cardSortable.transition,
    opacity: cardSortable.isDragging ? 0.5 : undefined,
    touchAction: 'none',
    userSelect: 'none',
  };
  const shouldShowCardActions = () => (
    !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  )
  return (
    <MuiCard
      style={dndkitCardStyle}
      ref={cardSortable.ref}
      sx={{
        maxWidth: 345,
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} title="green iguana" />}
      <CardContent sx={{ p: 1.5, '&:last-child': { paddingY: 1.5 } }}>
        <Typography >{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActions() && <CardActions sx={{ p: '0 4px 8px 4px' }}>
        {!!card?.memberIds?.length &&
          <Button startIcon={<PeopleAltIcon />} size="small">{card?.memberIds?.length}</Button>}
        {!!card?.comments?.length &&
          <Button startIcon={<CommentIcon />} size="small">{card?.comments?.length}</Button>}
        {!!card?.attachments?.length &&
          <Button startIcon={<AttachmentIcon />} size="small">{card?.attachments?.length}</Button>}
      </CardActions>}

    </MuiCard>
  )
}

export default Card