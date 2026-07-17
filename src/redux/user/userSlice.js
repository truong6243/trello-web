import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// khởi tạo giá trị của một slice trong redux
const initialState = {
  currentUser: null
}

// những hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào trong redux, dùng
// middle ware createAsyncThunk đi kèm với extraReducers
export const loginUserApi = createAsyncThunk(
  'user/loginUserApi',
  async (data) => {
    const res = await authorizeAxiosInstance.post(
      `${API_ROOT}/v1/users/login`, data
    )
    return res.data
  }
)

// khởi tạo một slice trong kho lưu trữ redux store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // nơi xử lý dữ liệu đồng bộ
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserApi.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
  }
})

// Action creators are generated for each case reducer function
// export const { } = userSlice.actions

// Selectors: là nơi dành cho các components bên dưới goi bằng hook useSelector()
// để lấy  dữ liệu từ trong kho redux store ra sử dụng
export const selectorCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer
