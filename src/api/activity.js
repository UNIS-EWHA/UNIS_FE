import api from "@/lib/axios";

export const getActivityContent = () => api.get("/activity");
