import { configureStore } from '@reduxjs/toolkit'
import activeBoardReducer from '~/redux/activeBoard/activeBoardSlice'
import { userReducer } from '~/redux/user/userSlice'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// cấu hình persist
const rootPersistConfig = {
  key: 'root', // key của persist do chúng ta chỉ định, để mặc định là root
  storage: storage, // biến storage ở trên mặc định lưu localStorage
  whitelist: ['user'] // định nghĩa các slice dữ liệu được phép duy trì qua mỗi lần f5 trình duyệt
  // blacklist : ['user] các slice dữ liệu không được phép duy trì sau khi f5
}

// Combine các reducers trong dự án
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})

// thực hiện persis reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  // fix warning error when implement redux-persist
  middleware: (getDefaultMiddleware) => getDefaultMiddleware( {serializableCheck: false})
})
