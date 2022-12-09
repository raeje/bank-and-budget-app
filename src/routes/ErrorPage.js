import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = ({ type }) => {
  const invalidAddressMsg = "Oops! Looks like you're lost.";
  const notAllowedMsg = "You are not allowed here!";

  const navigate = useNavigate();
  const handleBackBtn = () => {
    navigate(-1);
  };

  return (
    <div className="error-page-container">
      <div className="message-container">
        <h1>{invalidAddressMsg}</h1>
        <button className="go-back" onClick={handleBackBtn}>
          &lt; Go back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
