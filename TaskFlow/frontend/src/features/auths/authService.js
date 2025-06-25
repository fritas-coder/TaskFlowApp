import axios from "axios";

const API_URL = "https://taskflow-backend-433p.onrender.com/api/users";

//register
const register = async (userData) => {
  const res = await axios.post(API_URL + "/register", userData);
  if (res.data.token) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

//login
const login = async (userData) => {
  const res = await axios.post(API_URL + "/login", userData);
  if (res.data.token) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

//logout
const logOut = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logOut
};

export default authService;
