import api from "@/lib/axios";

export const getCommunityPosts = (params) =>
  api.get("/community/posts", { params });

export const getCommunityPostDetail = (postId) =>
  api.get(`/community/posts/${postId}`);

export const createCommunityPost = (payload) =>
  api.post("/community/posts", payload);

export const toggleCommunityPostSave = (postId) =>
  api.post(`/community/posts/${postId}/save`);
