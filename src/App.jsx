import Board from "./pages/Boards/_id"
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import NotFound from "~/pages/404/NotFound";
import Auth from "~/pages/Auth/Auth";
import AccountVerification from "./pages/Auth/AccountVerification"; '~/pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectorCurrentUser } from '~/redux/user/userSlice'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />

}
function App() {
  const currentUser = useSelector(selectorCurrentUser)
  return (
    <Routes>
      <Route path="/" element={
        <Navigate to={'/boards/6a2a61f941ffd538d9de606e'} replace={true} />
      } />

      // Protected Routes
      <Route element={<ProtectedRoute user={currentUser} />}>
        // Outlet sẽ chạy vào các child route trong này
        <Route path="/boards/:boardId" element={<Board />} />
      </Route>

      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
