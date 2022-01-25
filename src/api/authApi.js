import { instance } from "./axiosInstance";

export const signUp = (userData) => instance.post("signup", userData);
