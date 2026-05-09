import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { loginUser } from "../api/auth"

export default function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await loginUser(formData)

      localStorage.setItem("userInfo", JSON.stringify(data))

      alert("Login Successful")

      navigate("/dashboard")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Login to continue your AI interview preparation.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}