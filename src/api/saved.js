import api from "@/api/instance";

export const getSavedPosts = () => api.get("/saved");
