import axios from "./axios";

export const getItems = () => axios.get("/api/items");
export const createItem = (data) => axios.post("/api/items", data);
export const updateItem = (id, data) => axios.put(`/api/items/${id}`, data);
export const deleteItem = (id) => axios.delete(`/api/items/${id}`);
export const getStats = () => axios.get("/api/items/stats/all");