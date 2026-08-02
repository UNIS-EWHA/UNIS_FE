import api from "@/api/instance";

export const getSavedPosts = ({ type, page, size } = {}) =>
  api.get("/saved", { params: { type, page, size } });
