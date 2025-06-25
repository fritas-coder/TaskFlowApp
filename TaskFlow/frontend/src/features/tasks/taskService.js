import axios from "axios";
const API_URL = "https://taskflow-backend-433p.onrender.com/api/tasks";

//get tasks
const getTasks = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(API_URL, config);
  localStorage.setItem("task", JSON.stringify(res.data));
  return res.data;
};

//create task
const createTask = async (taskData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(API_URL, taskData, config);

  localStorage.setItem("task", JSON.stringify(res.data));

  return res.data;
};

// delete task
const deleteTask = async (taskId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.delete(`${API_URL}/${taskId}`, config);
  return res.data;
};
const taskService = { getTasks, createTask, deleteTask };
export default taskService;
