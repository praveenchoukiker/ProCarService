import React, { useEffect, useState } from "react";
import punch from "../assets/punch.png";
import BackButton from "./BackButton";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { closeComplaint, getComplaint } from "../features/car/carSlice";
import Loading from "../Component/Loading";
import { createNote, getNotes } from "../features/note/noteSlice";
import harrier from "../assets/harrier.png";
import tiago from "../assets/tiago.webp";
import curvv from "../assets/Curvv.webp";
import safari from "../assets/safari.png";
import nexon from "../assets/nexon.webp";

const SingleComplaints = () => {
  const { car, isLoading, isError, message } = useSelector(
    (state) => state.car
  );
  const { notes, isSuccess } = useSelector((state) => state.note);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createNote({
        id,
        text,
      })
    );
    toast.success("Note Added!");
    setText("");
  };
  // Close Complaint
  const handleCloseComplaint = () => {
    dispatch(closeComplaint(id));
    toast.success("Closed!");
  };

  useEffect(() => {
    dispatch(getComplaint(id));
    dispatch(getNotes(id));

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading || !car) {
    return <Loading />;
  }

  const carImage = {
    harrier: harrier,
    punch: punch,
    tiago: tiago,
    safari: safari,
    curvv: curvv,
    nexon: nexon,
  };

  function getImages(item) {
    return carImage[item] || punch;
  }

  return (
    <div className="container p-5">
      <BackButton url={"/cars"} />
      <h4 className="text-center fw-bold">Your Complaint</h4>

      <div className="card p-3 my-3  shadow-lg">
        <div className="d-flex aling-item-center justify-content-between ">
          <div>
            <h3 className="display-6 fw-semibold my-2">Car: {car?.car}</h3>
            <p className="  my-2">Registration: {car?.registration}</p>

            <h6>
              Status :{" "}
              <span
                className={
                  car?.status === "closed"
                    ? "badge text-bg-danger my-2"
                    : "badge text-bg-success my-2"
                }
              >
                {car?.status}
              </span>
            </h6>

            <p className="text-secondary">{car?.description}</p>

            <p className="text-secondary">
              Date : {new Date(car?.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>

          <div>
            {/* <img
              src={punch}
              style={{ height: "250px" }}
              alt=""
              className="img-fluid"
            /> */}
            <img
              src={getImages(car.car)}
              style={{ height: "250px" }}
              alt={car.car}
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <div className="card my-3 p-3 ">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Note Here...."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="my-2 w-50 form-control bg-secondary text-light">
            Add Note
          </button>
        </form>
      </div>
      {/* <ul className="list-group my-2">
                
          {notes?.map((note) => {
              return (
                <li key={note?._id} className="list-group-item ">
                  <p>{note?.note}</p>
                  <p>{note.user}</p>

                </li>
                
              );
              

          })}
        </ul> */}
      <ul className="list-group">
        {notes.length > 0 ? (
          notes?.map((note) => {
            return (
              <li
                key={note?._id}
                className={
                  note?.isStaff
                    ? "list-group-item bg-secondary"
                    : "list-group-item"
                }
              >
                <h1 className="h5">{note?.note}</h1>
                {note?.isStaff ? (
                  <p className="text-light">- From Staff</p>
                ) : (
                  <p className="text-secondary">-{user?.name}</p>
                )}
              </li>
            );
          })
        ) : (
          <>
            <h1>Notes not found</h1>
          </>
        )}
      </ul>

      <button
        className="btn btn-danger my-2 w-100"
        disabled={car?.status === "closed" ? true : false}
        onClick={handleCloseComplaint}
      >
        Close My Account
      </button>
    </div>
  );
};

export default SingleComplaints;
