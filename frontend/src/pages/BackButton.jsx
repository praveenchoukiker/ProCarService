import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ url }) => {
  return (
    <Link to={url} className="btn btn-outline-secondary text-dark">
      Go Back
    </Link>
  );
};

export default BackButton;
