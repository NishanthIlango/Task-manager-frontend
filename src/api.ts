import axios from "axios";

const API_BASE_URL = "http://localhost:9000/tasks"; // Ensure this URL is correct

export const getTasks = async () => {
  return axios.get(API_BASE_URL);
};

export const createTask = async (task: { name: string; owner: string; command: string }) => {
  console.log("Sending API request to create task:", task); // Debugging log
  const response = await axios.post(API_BASE_URL, task, {
    headers: { "Content-Type": "application/json" },  
  });
  console.log("Response from createTask API:", response.data); // Debugging log
  return response;
};

export const deleteTask = async (id: string) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export const executeTask = async (id: string) => {
  return axios.post(`${API_BASE_URL}/${id}/execute`);
};
