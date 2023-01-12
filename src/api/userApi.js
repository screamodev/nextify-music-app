import { instance } from "./axiosInstance";

export const getUserById = (userId) => instance.get(`users/${userId}`);

export const updateUserById = (userId, updatedData) =>
  instance.patch(`users/${userId}`, updatedData);
