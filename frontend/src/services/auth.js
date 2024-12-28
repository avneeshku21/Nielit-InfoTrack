import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/users" });

export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return API.post("/register", formData);
};
