import { getUsers, updateUsersList } from "../utils";

let users = getUsers();

const verifyLogin = (username, password) => {
  const currentUser = users.filter(
    (user) => username === user.username && password === user.password
  );
  return currentUser[0];
};

const Login = (props) => {
  const username = props.username;
  const password = props.password;
  const currentUser = verifyLogin(username, password);
  const setNotif = props.setNotif;

  if (currentUser) {
    updateUsersList(currentUser.username, "isLoggedIn", true);
    setNotif({
      status: "success",
      message: `${currentUser.username} logged in!`,
    });
    console.log(`${currentUser.username} logged in! ${currentUser.role}`);
  }
  setNotif({
    status: "error",
    message: "Wrong username or password.",
  });
  console.log("Wrong username or password.");
};

export default Login;
