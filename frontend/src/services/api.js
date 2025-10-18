import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const reportIssue = (data) => API.post("/report", data);
export const getIssues = () => API.get("/issues");
export const updateIssueStatus = (id, data) => API.put(`/issues/${id}`, data);
