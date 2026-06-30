import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
} from '~/apis/index'
import {
  fecthBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectorCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectorCurrentActiveBoard)
  useEffect(() => {
    const boardId = '6a2a61f941ffd538d9de606e'
    dispatch(fecthBoardDetailsAPI(boardId))
  }, [dispatch])

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))
    // Goi API update board
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCardInTheSameColumn = (reorderedCards, reorderedCardIds, columnId) => {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = reorderedCards
      columnToUpdate.cardOrderIds = reorderedCardIds
      dispatch(updateCurrentActiveBoard(newBoard))
    }
    updateColumnDetailsAPI(columnId, { cardOrderIds: reorderedCardIds })
  }

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
    dispatch(updateCurrentActiveBoard(newBoard))

    // Goi API update board
    moveCardToDifferentColumnAPI({
      // Di chuyển card từ cột này sang cột khác
      // Bước 1: Cập nhật mảng cardOrderIds của cột cũ (bản chất là xóa id card ra khỏi mảng)
      // Bước 2: Cập nhật mảng cardOrderIds của cột mới (thêm id card vào mảng)
      // Bước 3: Cập nhật lại columnId của card
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

          moveColumns={moveColumns}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
        />
      </Container>
    </>
  )
}

export default Board