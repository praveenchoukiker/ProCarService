import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../features/car/carSlice";
import Loading from "../Component/Loading";
import { toast } from "react-toastify";

const AllCarsComplaints = () => {
  const { cars, isLoading, isError, message } = useSelector(
    (state) => state.car
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComplaints());
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <BackButton url={"/"} />
      <h1 className="text-center fw-bold">All Complaints Here</h1>
      <div className="card my-3 p-3 w-100 shadow-lg">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Date</th>
              <th scope="col">Car</th>
              <th scope="col">Registration No.</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{new Date(car.createdAt).toLocaleDateString("en-IN")}</td>
                  <td>{car.car}</td>
                  <td>{car.registration}</td>

                  <td>
                    <span
                      className={
                        car.status === "open"
                          ? "badge text-bg-success"
                          : "badge text-bg-primary"
                      }
                    >
                      {car.status}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/cars/${car._id}`}
                      className="btn btn-sm btn-dark justify-center "
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCarsComplaints;
