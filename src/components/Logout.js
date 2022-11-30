import { updateUsersList } from "../utils";

const Logout = (props) => {
  const username = props.username;
  updateUsersList(username, "isLoggedIn", false);
  console.log(`${username} logged out!`);
};

export default Logout;
