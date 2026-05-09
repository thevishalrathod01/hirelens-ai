import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const userInfo = localStorage.getItem("userInfo")

  return userInfo ? children : <Navigate to="/login" />
}