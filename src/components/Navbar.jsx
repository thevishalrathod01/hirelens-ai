import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  const logoutHandler = () => {
    localStorage.removeItem("userInfo")

    navigate("/login")
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black text-white">

      <Link
        to="/"
        className="text-2xl font-bold text-blue-500"
      >
        HireLens AI
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        {!userInfo ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/mock-interview">
              Mock Interview
            </Link>

            <Link to="/history">
              Interview History
            </Link>

            <Link to="/resume-history">
              Resume History
            </Link>

            <button
              onClick={logoutHandler}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  )
}