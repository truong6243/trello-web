// import { API_ROOT } from '~/utils/constants'
// import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { createSlice } from '@reduxjs/toolkit'
// khởi tạo giá trị của một slice trong redux
const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}

// khởi tạo một slice trong kho lưu trữ redux store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // nơi xử lý dữ liệu đồng bộ
  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },
    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
    },
    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload

      // xử lý dữ liệu nếu cần thiết

      // update lại dữ liệu currentActiveBoard
      state.currentActiveCard = fullCard
    }
  },

  // xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {}
})

// Action creators are generated for each case reducer function
export const {
  clearAndHideCurrentActiveCard,
  updateCurrentActiveCard,
  showModalActiveCard
} = activeCardSlice.actions

// Selectors: là nơi dành cho các components bên dưới goi bằng hook useSelector()
// để lấy  dữ liệu từ trong kho redux store ra sử dụng
export const selectorCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}
export const selectorIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard
}

export default activeCardSlice.reducer
