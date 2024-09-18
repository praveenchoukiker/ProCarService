import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import { raiseComplaint } from "../features/car/carSlice";
import Loading from "../Component/Loading";
import { toast } from "react-toastify";

const RaiseComplaint = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { car } = useSelector((state) => state.car);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    car: "",
    registration: "",
    description: "",
  });

  const { carName, registration, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(raiseComplaint(formData));
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    if (car) {
      navigate("/cars");
    }
  }, [isError, message, car]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <BackButton url={"/"} />
      <h1 className="text-center fw-bold">Raise Complaints</h1>

      <div className="card shadow-lg p-3 my-3">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={user.name}
            className=" form-control my-2 shadow"
            disabled={true}
          />
          <input
            type="email"
            placeholder="Enter Your email"
            value={user.email}
            className=" form-control my-2 shadow"
            disabled={true}
          />
          <input
            type="text"
            name="registration"
            value={registration}
            onChange={handleChange}
            className="form-control "
            placeholder="Registration No."
            required
          />
          <select
            className="form-select shadow-lg my-2"
            name="car"
            value={carName}
            onChange={handleChange}
            required
          >
            <option value="#">Please Select Your Car Model</option>
            <option value="punch">Punch</option>
            <option value="tiago">Tiago</option>
            <option value="nexon">Nexon</option>
            <option value="harrier">Harrier</option>
            <option value="curvv">Curvv</option>
            <option value="safari">Safari</option>
          </select>
          <textarea
            className="form-control my-3 shadow-lg"
            placeholder="Discribe Your Issue here"
            name="description"
            value={description}
            onChange={handleChange}
            required
          ></textarea>
          <button className="w-100 btn btn-dark shadow-lg fw-bold">
            Raise Complaint
          </button>
        </form>

      </div>
    </div>
  );
};

export default RaiseComplaint;
