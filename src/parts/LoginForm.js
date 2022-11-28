import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Login from "../components/Login";

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
    const currentUser = Login({ username, password });
    console.log(currentUser);
    if (currentUser) navigate("/dashboard", { state: currentUser });
  };

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
