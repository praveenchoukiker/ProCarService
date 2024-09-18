import axios from "axios";

const Register = async (formData) => {
  const response = await axios.post("/api/user", formData);
  //   console.log(response.data);

  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};
const Login = async (formData) => {
  const response = await axios.post("/api/user/login", formData);
  //   console.log(response.data);

  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const authService = {
  Register,
  Login,
};

export default authService;
