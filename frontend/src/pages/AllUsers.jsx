import React, { useEffect } from "react";
import { toast } from "react-toastify";
import BackButton from "./BackButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/admin/adminSlice";
import Loading from "../Component/Loading";

const AllUsers = () => {
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    if (isError && message) {
      toast.error(message);
    }
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container p-5">
      <BackButton url={"/"} />
      <h1 className="text-center fw-bold">All Users</h1>
      <div className="card my-3 p-3 w-100 shadow-lg">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
