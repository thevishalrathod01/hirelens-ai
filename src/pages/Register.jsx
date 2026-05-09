import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { registerUser } from "../api/auth"

export default function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
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
      const data = await registerUser(formData)

      localStorage.setItem("userInfo", JSON.stringify(data))

      alert("Registration Successful")

      navigate("/dashboard")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Start your AI-powered interview preparation.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

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
              placeholder="Create password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
          >
            Register
          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}