import axios from "axios"

const BASE_URL = "https://hirelens-ai-backend.onrender.com"

const API = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
})

const getAuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  return {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }
}

export const registerUser = async (userData) => {
  const response = await API.post("/register", userData)

  return response.data
}

export const loginUser = async (userData) => {
  const response = await API.post("/login", userData)

  return response.data
}

export const uploadResume = async (formData) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  const response = await axios.post(
    `${BASE_URL}/api/resume/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    }
  )

  return response.data
}

export const generateInterview = async (role) => {
  const response = await axios.post(
    `${BASE_URL}/api/interview/generate`,
    { role },
    getAuthHeader()
  )

  return response.data
}

export const evaluateInterview = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/api/interview/evaluate`,
    data,
    getAuthHeader()
  )

  return response.data
}

export const getInterviewHistory = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/interview/history`,
    getAuthHeader()
  )

  return response.data
}

export const getResumeHistory = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/resume/history`,
    getAuthHeader()
  )

  return response.data
}