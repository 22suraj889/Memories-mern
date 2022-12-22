import axios from "axios";

const API = axios.create({ baseURL: "https://memories90.herokuapp.com" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const fetchPosts = () => API.get("/posts");
export const createPosts = (newPost) => API.post("/posts", newPost);
export const updatePosts = (updatedId, updatedPost) =>
  API.patch(`/posts/${updatedId}/update`, updatedPost);

export const deletePosts = (id) => API.delete(`/posts/${id}/delete`);
export const likePosts = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
