import axios from "./axios";

export const registerUser = (data) => axios.post("/api/auth/register", data);
export const loginUser = (data) => axios.post("/api/auth/login", data);
export const forgotPasswordUser = (data) => axios.post("/api/auth/forgot-password", data);
export const resetPasswordUser = (data) => axios.post("/api/auth/reset-password", data);
export const getCurrentUser = () => axios.get("/api/auth/me");
export const updateProfileUser = (data) => axios.put("/api/auth/profile", data);