// cấu hình Socket-io phía client và export ra biến socketIoInstance
// https://socket.io/how-to/use-with-react
import { io } from 'socket.io-client'
import { API_ROOT } from './utils/constants.js'
export const socketIoInstance = io(API_ROOT)