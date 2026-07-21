import api from "@/lib/axios";

export const getAboutContent = () => api.get("/about");
