import React from 'react'
import Box from '@mui/material/Box'
import Card from './Card/Card'
const ListCards = ({ cards, column }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: '0 5px 10px 5px',
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
                ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight}) `
        )),

      }}
    >
      {cards?.map((card, index) => <Card key={card._id}
        card={card} index={index} columnId={column._id} />)}
    </Box>
  )
}

export default ListCards