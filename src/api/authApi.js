import { instance } from "./axiosInstance";

export const signUp = (userData) => instance.post("signup", userData);

export const signIn = (userData) => instance.post("signin", userData);
