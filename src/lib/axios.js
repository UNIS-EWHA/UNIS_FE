import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 성공 응답은 { status, code, message, data } 로 오므로 바로 이 형태를 반환.
// 에러 응답은 { timestamp, status, errorCode, message, path, detail } 형태로
// error.response.data 에 그대로 담겨 reject 됨.
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export default api;
