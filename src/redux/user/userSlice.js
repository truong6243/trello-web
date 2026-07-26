import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
// khởi tạo giá trị của một slice trong redux
const initialState = {
  currentUser: null
}

// những hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào trong redux, dùng
// middle ware createAsyncThunk đi kèm với extraReducers
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const res = await authorizeAxiosInstance.post(
      `${API_ROOT}/v1/users/login`,
      data
    )
    return res.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const res = await authorizeAxiosInstance.delete(
      `${API_ROOT}/v1/users/logout`
    )
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return res.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const res = await authorizeAxiosInstance.put(
      `${API_ROOT}/v1/users/update`, data
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
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const updatedUser = action.payload
      state.currentUser = updatedUser
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
