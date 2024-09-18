import React, { useEffect, useState } from "react";
import Loading from "../Component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(

    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);


    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user && isSuccess) {
      navigate("/");
    }
    if (isError && message) {
      toast.error(message);
    }
  }, [user, isSuccess, message, isError]);
  if (isLoading) {
    return <Loading />;
  }


  return (
    <div className=" Login container p-5">
      <h1 className="text-center fw-bold">Login Here</h1>
      <div className="card p-4 shadow-lg rounded-0 my-3">
        <form onSubmit={handleSubmit}>
          <input
            name ='email'
            onChange={handleChange}
            value={email}
            type="email"
            placeholder="Enter Your Email"
            className="my-2 shadow-lg form-control rounded-0"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            placeholder="Enter Password"
            className="my-2  shadow-lg form-control rounded-0"
          />
          <button
           className="  shadow-lg w-100  
           btn btn-success text-center rounded-0 text-light p-1 border-0  "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
