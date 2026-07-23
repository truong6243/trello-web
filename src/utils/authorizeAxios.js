import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/fomatter'
import { refreshTokenApi } from '~/apis/index'
import { logoutUserApi } from '~/redux/user/userSlice'

/* 
Không thể import { store } from '~/redux/store/' theo cách thông thường được
Giải pháp: Inject store: là kỹ thuật sử dụng biến redux store ở các file nằm ngoại phạm vi
component như file authorizeAxios hiện tại
Khi ứng dụng bát đầu chạy code sẽ chạy vào main.jsx đầu tiên, từ bên đó ta sẽ gọi vào 
hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này
*/
let axiosReduxStore
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}
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

/*
Khởi tạo một promise cho việc gọi api refreshToken
Mục đích của việc tạo promise này là khi nào gọi api refreshToken xong xuoi thì mới
retry lại nhiều api lỗi trước đó
*/
let refreshTokenPromise = null

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

    // Xử lý refreshToken tự động
    // Trường hợp 1: Nếu nhận mã 401 từ BE, thì gọi api đăng xuát luôn
    if (error?.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserApi(false))
    }
    // Trường hợp 2: nếu như nhận được mã 410 từ BE, thì sẽ gọi api refreshToken để
    // làm mới lại accessToken
    // Đầu tiên lấy được các request Api đang bị lõi thông qua error.config
    const originalRequest = error.config
    if (error?.response?.status === 410 && !originalRequest._retry) {
      // gắn thêm một giá trị _retry luôn = true trong khoảng thời gian chờ, đảm bảo việc gọi
      // reresh token 1 lần tại một điểm
      originalRequest._retry = true

      // kiểm tra nếu chưa có refreshTokenPromise thì thực hiện việc gọi api và gán vào refreshTokenPromise
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenApi()
          .then((data) => {
            // đồng thời accessToken đã nằm trong httpOnly(xử lý bên BE)
            return data?.accessToken
          })
          .catch((_error) => {
            // nếu có bất kỳ lỗi nào liên quan đến refreshToken thì cho log out luôn
            axiosReduxStore.dispatch(logoutUserApi())
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }
      // cần return trường hợp refreshTokenPromise chạy thành công và xử lý thêm ở đây
      return refreshTokenPromise.then((accessToken) => {
        /*
        Bước 1: đối với dự án cần lưu accessToken vào localStorage hoặc đâu đó thì sẽ viết 
        thêm code xử lý ở đây
        Hiện tại không cần xử lý vì bên BE đã lưu accessToken vào httpOnly cookie sau khi đã gọi api refreshToken thành công
        Bước 2: Return lại axiosInstance kết hợp với các originalRequest để gọi lại những api ban đầu bị lõi
        
        */
        return authorizeAxiosInstance(originalRequest)
      })
    }

    // xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây
    let errorMessage = error?.message
    if (error?.response?.data?.message) {
      errorMessage = error?.response?.data?.message
    }
    if (error?.response?.status !== 410) {
      toast.error(errorMessage)
      return Promise.reject(error)
    }
  }
)

export default authorizeAxiosInstance
