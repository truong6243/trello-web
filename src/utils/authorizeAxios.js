import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/fomatter'

// khởi tạo một đối tượng authorizeAxiosInstance để custom chung cho dự án
let authorizeAxiosInstance = axios.create()
// cấu hình thời gian tối đa của một req là 10 phút
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
// cho phép axios tự động gửi cookies trong mỗi req lên BE (phục vụ lưu jwt tokens
// vào trong httpOnly của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true

// cấu hình interceptor
// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // kỹ thuật chặn spam click
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    // kỹ thuật chặn spam click
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // kỹ thuật chặn spam click
    interceptorLoadingElements(false)

    let errorMessage = error?.message
    if (error?.response?.data?.message) {
      errorMessage = error?.response?.data?.message
    }
    if(error?.response?.status !== 410) {
      toast.error(errorMessage)
      return Promise.reject(error)
    }
  }
)

export default authorizeAxiosInstance
