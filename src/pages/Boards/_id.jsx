import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';
import {
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
  deleteColumnDetailsAPI
} from '~/apis/index'
import { toast } from 'react-toastify'
import {
  fecthBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectorCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'

function Board() {
  const dispatch = useDispatch()
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '6a2a61f941ffd538d9de606e'
    dispatch(fecthBoardDetailsAPI(boardId))
  }, [dispatch])

  const createNewColumn = async (columnData) => {
    const createdColumn = await createNewColumnAPI({ ...columnData, boardId: board._id })
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const deleteColumnDetails = async (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(column => column._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(id => id !== columnId)
    setBoard(newBoard)

    // Goi API
    await deleteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res.deleteResult)
    })
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

  const moveCardInTheSameColumn = (reorderedCards, reorderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = reorderedCards
      columnToUpdate.cardOrderIds = reorderedCardIds
      setBoard(newBoard)
    }
    updateColumnDetailsAPI(columnId, { cardOrderIds: reorderedCardIds })
  }

  // Di chuyển card từ cột này sang cột khác
  // Bước 1: Cập nhật mảng cardOrderIds của cột cũ (bản chất là xóa id card ra khỏi mảng)
  // Bước 2: Cập nhật mảng cardOrderIds của cột mới (thêm id card vào mảng)
  // Bước 3: Cập nhật lại columnId của card
  const moveCardToDifferentColumn = (
    cardId,
    initialGroup,
    group,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Goi API update board
    moveCardToDifferentColumnAPI({
      currentCardId: cardId,
      prevColumnId: initialGroup,
      prevCardOrderIds: dndOrderedColumns.find(c => c._id === initialGroup)?.cardOrderIds,
      nextColumnId: group,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === group)?.cardOrderIds,
    })
  }

  if (!board) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
        <CircularProgress size="3rem" aria-label="Loading…" />
        <Typography>Loading Board...</Typography>
      </Box>
    )
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
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
          deleteColumnDetails={deleteColumnDetails}
        />
      </Container>
    </>
  )
}

export default Board