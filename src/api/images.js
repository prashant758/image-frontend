import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getAllImages = () => axios.get(`${BASE_URL}/images`);
export const getImageById = (id) => axios.get(`${BASE_URL}/images/${id}`);
export const searchImages = (query) =>
  axios.get(`${BASE_URL}/images/search?q=${query}`);
export const likeImage = (id) => axios.post(`${BASE_URL}/images/${id}/like`);