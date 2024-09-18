import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/proccar logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <nav className="navbar bg-light shadow-lg ">
      <div className="container-fluid">
        <Link to={"/"}>
          <img id="logo" src={logo} />
        </Link>

        <span className="d-flex" role="search">
          {!user ? (
            <>
              <Link
                to={"/Login"}
                className="btn btn-outline-success bg-success text-light "
                type="submit "
              >
                Login
              </Link>

              <Link
                to={"/Register"}
                className="btn btn-outline-success mx-2"
                type="submit"
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              to={"/"}
              onClick={handleLogout}
              className="btn btn-outline-danger bg-danger text-light "
              type="submit"
            >
              LogOut
            </Link>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
