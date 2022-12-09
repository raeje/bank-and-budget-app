import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = ({ type }) => {
  const location = type ? undefined : useLocation();
  const errorType = type ? type : location.state.type;

  const lostMsg = "Oops! Looks like you're lost.";
  const notAllowedMsg = "You are not allowed here!";
  const noAccessMsg = (() => {
    if (!location) {
      return;
    }
    const requiredRole = location.state.role === "admin" ? "customer" : "admin";
    return `The page you're trying to access requires ${requiredRole.toUpperCase()} privileges.`;
  })();

  const navigate = useNavigate();
  const handleBackBtn = () => {
    navigate(-1);
  };

  return (
    <div className="error-page-container">
      <div className="message-container">
        <h1>{errorType === "lost" ? lostMsg : notAllowedMsg}</h1>
        <span className="addt-error-info">{noAccessMsg}</span>
        <button className="go-back" onClick={handleBackBtn}>
          &lt; GO BACK
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
