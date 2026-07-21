import api from "@/lib/axios";

export const getProjects = (params) => api.get("/projects", { params });

export const getProjectDetail = (projectId) =>
  api.get(`/projects/${projectId}`);
