import * as axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_DEPLOYMENT_API_URL
    : process.env.REACT_APP_DEVELOPMENT_API_URL;

export const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});
