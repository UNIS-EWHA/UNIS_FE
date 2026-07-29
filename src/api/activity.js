import api from "@/api/instance";

export const getActivityContent = () => api.get("/activity");
