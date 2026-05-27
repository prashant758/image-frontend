import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const signup = (data) => API.post("/api/auth/signup", {
  username: data.username,
  email: data.email,
  password: data.password,
});

export const login = (data) => {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);
  return API.post("/api/auth/login", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const logout = () => API.post("/api/auth/logout");
export const getMe = () => API.get("/api/auth/me");
export const getUserById = (id) => API.get(`/api/auth/users/${id}`);

// PROMPTS
export const getAllPrompts = () => API.get("/api/prompts/");
export const getTrendingPrompts = () => API.get("/api/prompts/trending");
export const getPromptById = (id) => API.get(`/api/prompts/${id}`);
export const createPrompt = (data) => API.post("/api/prompts/", data);
export const deletePrompt = (id) => API.delete(`/api/prompts/${id}`);

// IMAGES
export const uploadImage = (formData, promptId) =>
  API.post(`/api/images/upload?prompt_id=${promptId}`, formData);
export const getImagesByPrompt = (id) => API.get(`/api/images/prompt/${id}`);
export const deleteImage = (id) => API.delete(`/api/images/${id}`);

// SOCIAL
export const likePrompt = (id) => API.post(`/api/like/${id}`);
export const getLikeCount = (id) => API.get(`/api/like/${id}/count`);
export const addComment = (id, text) => API.post(`/api/comment/${id}`, { text });
export const getComments = (id) => API.get(`/api/comment/${id}`);
export const deleteComment = (id) => API.delete(`/api/comment/${id}`);
export const followUser = (id) => API.post(`/api/follow/${id}`);
export const createCollection = (data) => API.post("/api/collections/", data);
export const getMyCollections = () => API.get("/api/collections/my");

// AI
export const searchByText = (query, limit = 10) =>
  API.post("/api/ai/search", { query, limit });
export const findSimilarImages = (imageId, limit = 5) =>
  API.post("/api/ai/similar-images", { image_id: imageId, limit });