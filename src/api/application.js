import api from "@/api/instance";

export const getRecruitInfo = () => api.get("/applications/recruit-info");

export const checkStudentId = (studentId) =>
  api.get("/applications/student-id/check", { params: { studentId } });

export const uploadPortfolio = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/applications/portfolio/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const submitApplication = (payload) =>
  api.post("/applications", payload);
