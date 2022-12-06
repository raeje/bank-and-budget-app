import React, { useState, useEffect } from "react";
import { UserInfo } from "../parts";
import { getCurrentUser } from "../utils";
import "./Profile.css";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    setCurrentUser(getCurrentUser);
  }, []);

  return <UserInfo customer={currentUser} profile="true" />;
};

export default Profile;
