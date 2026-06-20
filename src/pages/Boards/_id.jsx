import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '../../apis/mock-data'
import { useEffect, useState } from 'react'
import { fecthBoardDetailsAPI } from '~/apis'
import { createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI } from '~/apis/index'

function Board() {
  const [board, setBoard] = useState(null)
  const boardId = '6a2a61f941ffd538d9de606e'
  useEffect(() => {
    fecthBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (columnData) => {
    const createdColumn = await createNewColumnAPI({ ...columnData, boardId: board._id })
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (cardData) => {
    const createdCard = await createNewCardAPI({ ...cardData, boardId: board._id })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
      setBoard(newBoard)
    }
  }

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Goi API update board
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  return (
    <>
      <Container disableGutters maxWidth={false} >
        <AppBar />
        <BoardBar board={board} />
        <BoardContent
          board={board}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          moveColumns={moveColumns}
        />
      </Container>
    </>
  )
}

export default Board