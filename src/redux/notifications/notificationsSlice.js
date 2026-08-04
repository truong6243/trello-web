import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// khởi tạo giá trị của một slice trong redux
const initialState = {
  currentNotifications: null
}

// những hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào trong redux, dùng
// middle ware createAsyncThunk đi kèm với extraReducers
export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const res = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return res.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({status, invitationId}) => {
    const res = await authorizeAxiosInstance.put(
      `${API_ROOT}/v1/invitations/board/${invitationId}`,
      { status }
    )
    return res.data
  }
)

// khởi tạo một slice trong kho lưu trữ redux store
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // nơi xử lý dữ liệu đồng bộ
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, actions) => {
      state.currentNotifications = actions.payload
    },
    addNotification: (state, action) => {
      const incomingInvitation = action.payload
      state.currentNotifications.unshift(incomingInvitation)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload
      // đảo ngược lại mảng invitations để thông báo mới nhất lên đầu
      state.currentNotifications = Array.isArray(incomingInvitations)
        ? incomingInvitations.reverse()
        : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload
      // cập nhật lại dữ liệu boardInvitation (status mới sau khi update)
      const getInvitation = state.currentNotifications.find(
        (i) => i._id === incomingInvitation._id
      )
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

// Action creators are generated for each case reducer function
export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotification
} = notificationsSlice.actions

// Selectors: là nơi dành cho các components bên dưới goi bằng hook useSelector()
// để lấy  dữ liệu từ trong kho redux store ra sử dụng
export const selectorCurrentNotifications = (state) => {
  return state.notifications.currentNotifications
}

export const notificationsReducer = notificationsSlice.reducer
