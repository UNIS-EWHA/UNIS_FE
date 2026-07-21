import api from "@/lib/axios";

export const signup = (payload) => api.post("/auth/signup", payload);

export const sendEmailCode = (email) =>
  api.post("/auth/email/send", { email });

export const verifyEmailCode = (email, code) =>
  api.post("/auth/email/verify", { email, code });

export const checkLoginId = (loginId) =>
  api.get("/auth/login-id/check", { params: { "login-id": loginId } });
