import api from "@/lib/axios";

export const getHomeStats = () => api.get("/home/stats");

export const getHomeArchive = () => api.get("/home/archive");

export const getHomeTestimonials = () => api.get("/home/testimonials");
