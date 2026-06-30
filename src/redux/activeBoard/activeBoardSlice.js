import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
import { mapOrder } from '~/utils/fomatter'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// khởi tạo giá trị của một slice trong redux
const initialState = {
  currentActiveBoard: null
}

// những hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào trong redux, dùng
// middle ware createAsyncThunk đi kèm với extraReducers
export const fecthBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fecthBoardDetailsAPI',
  async (boardId) => {
    const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return res.data
  }
)

// khởi tạo một slice trong kho lưu trữ redux store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload

      // xử lý dữ liệu nếu cần thiết

      // update lại dữ liệu currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fecthBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
      board.columns.forEach((column) => {
        column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
      })
      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selectors: là nơi dành cho các components bên dưới goi bằng hook useSelector()
// để lấy  dữ liệu từ trong kho redux store ra sử dụng
export const selectorCurrentActiveBoard = (state) => {
  state.activeBoard.currentActiveBoard
}

export default activeBoardSlice.reducer
