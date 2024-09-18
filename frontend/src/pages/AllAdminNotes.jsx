import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackButton from "./BackButton";
import Loading from "../Component/Loading";
import { getAllNotes } from "../features/admin/adminSlice";

const AllAdminNotes = () => {
  const { isLoading, isError, message, notes } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotes());

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container p-3">
        <BackButton url={"/"} />
        <h1 className="text-center">All Notes</h1>
      <div className="card my-3 p-3 w-100 shadow-lg">
        <table className="table justify-between p-2">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{note.note}</td>

                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    
    </>
  );
};

export default AllAdminNotes;
