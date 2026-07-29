import api from "@/api/instance";

export const getHomeHero = () => api.get("/home/hero");

export const getHomeStats = () => api.get("/home/stats");

export const getHomeArchive = () => api.get("/home/archive");

export const getHomeTestimonials = () => api.get("/home/testimonials");
