import api from "@/api/instance";

export const signup = (payload) => api.post("/auth/signup", payload);

export const sendEmailCode = (email) =>
  api.post("/auth/email/send", { email });

export const verifyEmailCode = (email, code) =>
  api.post("/auth/email/verify", { email, code });

export const checkLoginId = (loginId) =>
  api.get("/auth/login-id/check", { params: { loginId } });

export const login = (payload) => api.post("/auth/login", payload);

export const reissue = () => api.post("/auth/reissue");

export const logout = () => api.post("/auth/logout");
