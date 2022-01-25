import * as axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});
