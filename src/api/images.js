import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH — /api/auth/
export const signup = (data) => API.post("/auth/signup", {
  username: data.username,
  email: data.email,
  password: data.password,
});

export const login = (data) => {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);
  return API.post("/auth/login", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const logout = () => API.post("/auth/logout");
export const getMe = () => API.get("/auth/me");
export const getUserById = (id) => API.get(`/auth/users/${id}`);

// PROMPTS — /api/prompts/
export const getAllPrompts = () => API.get("/prompts/");
export const getTrendingPrompts = () => API.get("/prompts/trending");
export const getPromptById = (id) => API.get(`/prompts/${id}`);
export const createPrompt = (data) => API.post("/prompts/", data);
export const deletePrompt = (id) => API.delete(`/prompts/${id}`);

// IMAGES — /api/images/
export const uploadImage = (formData, promptId) =>
  API.post(`/images/upload?prompt_id=${promptId}`, formData);
export const getImagesByPrompt = (id) => API.get(`/images/prompt/${id}`);
export const deleteImage = (id) => API.delete(`/images/${id}`);

// SOCIAL — /api/
export const likePrompt = (id) => API.post(`/like/${id}`);
export const getLikeCount = (id) => API.get(`/like/${id}/count`);
export const addComment = (id, text) => API.post(`/comment/${id}`, { text });
export const getComments = (id) => API.get(`/comment/${id}`);
export const deleteComment = (id) => API.delete(`/comment/${id}`);
export const followUser = (id) => API.post(`/follow/${id}`);
export const getFollowers = (id) => API.get(`/follow/${id}/followers`);
export const getFollowing = (id) => API.get(`/follow/${id}/following`);
export const createCollection = (data) => API.post("/collections/", data);
export const getMyCollections = () => API.get("/collections/my");

// AI — /api/ai/
export const searchByText = (query, limit = 10) =>
  API.post("/ai/search", { query, limit });
export const findSimilarImages = (imageId, limit = 5) =>
  API.post("/ai/similar-images", { image_id: imageId, limit });