import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../features/auth/authSlice";
import Loading from "../Component/Loading";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    if (password !== password2) {
      toast.error("Password not Match!");
    }
    dispatch(registerUser(formData));
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
    <div className="container p-5">
      <h1 className="text-center fw-bold">Register Here</h1>
      <div className="card p-4 shadow-lg rounded-0 my-4">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="name"
            value={name}
            type="text"
            placeholder="Enter Your Name"
            className="my-2 shadow-lg form-control rounded-0"
          />
          <input
            onChange={handleChange}
            name="email"
            value={email}
            type="email"
            placeholder="Enter Your Email"
            className="my-2 shadow-lg form-control rounded-0"
          />
          <input
            onChange={handleChange}
            name="password"
            value={password}
            type="password"
            placeholder="Enter Password"
            className="my-2  shadow-lg form-control rounded-0"
          />
          <input
            onChange={handleChange}
            name="password2"
            value={password2}
            type="password"
            placeholder=" Confirm Password"
            className="my-2 shadow-lg form-control rounded-0"
          />
          <button className="  shadow-lg w-100   btn btn-dark text-center rounded-0 text-light p-1 border-0  ">
            Sing Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
