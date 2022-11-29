import { getUsers } from "../utils";
import { useNavigate } from "react-router-dom";

let users = getUsers();
//const navigate = useNavigate();

const Logout = (props) => {
  const username = props.username;
  console.log(props);

  users.forEach((user) => {
    if (username === user.username) {
      user.isLoggedIn = false;
      localStorage.setItem("users", JSON.stringify(users));
      console.log(`${username} logged out!`);
    }
  });

  //navigate("/home", { replace: true });
};

export default Logout;
