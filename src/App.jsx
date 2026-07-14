import Board from "./pages/Boards/_id"
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "~/pages/404/NotFound";
import Auth from "~/pages/Auth/Auth";
import AccountVerification from "./pages/Auth/AccountVerification"; '~/pages/Auth/AccountVerification'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Navigate to={'/boards/6a2a61f941ffd538d9de606e'} replace={true} />
      } />
      <Route path="/boards/:boardId" element={<Board />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
