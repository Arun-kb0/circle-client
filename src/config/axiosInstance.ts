import axios from "axios";

const BASE_URL = 'http://localhost:5001'

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials:true
})

const axiosNormal = axios.create({})

export {
  axiosPrivate,
  axiosNormal
 }
export default axiosInstance