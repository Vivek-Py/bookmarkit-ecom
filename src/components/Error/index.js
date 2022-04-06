import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found flex column">
      <img
        className="image-not-found"
        src="https://constant.myntassets.com/web/assets/img/11488523304066-search404.png"
        alt="Could not find product"
      />
      <h3 className="h3">Could not find anything here!</h3>
      <button className="primary-btn back-store" onClick={() => navigate("/")}>
        Take me to store!
      </button>
    </div>
  );
};

export default Error;
