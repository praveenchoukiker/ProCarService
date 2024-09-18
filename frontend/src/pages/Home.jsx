import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../features/car/carSlice";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(reset())
  },[user]);

  if(user?.isAdmin){
    return (
      <div className="container p-5">
        <h1 className="text-center shadow-lg fw-semibold">
          WelCome {user?.name}
        </h1>

        <div className=" card my-5  p-3 shadow-xl">
          <h4 className="text-center">Please Select An Option</h4>

          <Link
            to={"/admin/users"}
            className="btn fw-semibold btn-outline-secondary mt-3"
          >
            View All Users
          </Link>
          <Link
            to={"/admin/cars"}
            className="btn btn-outline-dark  fw-semibold my-1"
          >
            View All Complaint
          </Link>
          <Link
            to={"/admin/notes"}
            className="btn btn-outline-dark  fw-semibold my-1"
          >
            View All Notes
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="container p-5 ">
      <h1 className="text-center shadow-lg fw-semibold">WelCome {user?.name}</h1>

      <div className=" card my-5  p-3 shadow-xl">
        <h4 className="text-center">Please Select An Option</h4>

        <Link
          to={"/raise"}
          className="btn fw-semibold btn-outline-secondary  mt-3"
        >
          Raise Complaint
        </Link>
        <Link to={"/cars"} className="btn btn-outline-dark  fw-semibold my-1">
          View Complaint
        </Link>
      </div>
    </div>
  );
};

export default Home;
