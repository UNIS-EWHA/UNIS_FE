import api from "@/api/instance";

export const getAboutContent = () => api.get("/about");
