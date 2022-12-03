import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { Dashboard } from "../pages";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Login from "../components/Login";
import { getCurrentUser } from "../utils";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    Login({ username, password });
    const currentUser = getCurrentUser();
    if (currentUser) {
      console.log("LoginForm", currentUser);
      //navigate("/dashboard", { state: currentUser, replace: true });
      navigate("/dashboard", { replace: true });
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        document.getElementById("login-btn").click();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="login-form-container">
      <label htmlFor="username">USERNAME: </label>
      <input
        type="text"
        className="username"
        id="username"
        onChange={handleUsernameChange}
        required
      />

      <label htmlFor="password">PASSWORD: </label>
      <input
        type="password"
        className="password"
        id="password"
        onChange={handlePasswordChange}
        required
      />

      <span className="error-msg">ERROR: error!</span>

      <button
        type="button"
        className="login-btn"
        id="login-btn"
        onClick={handleLogin}
      >
        LOGIN
      </button>
    </div>
  );
};

export default LoginForm;
