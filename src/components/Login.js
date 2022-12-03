import { getUsers, updateUsersList } from "../utils";

let users = getUsers();
/*
users.forEach((user) =>
  console.log(`username: ${user.username} isLoggedIn: ${user.isLoggedIn}`)
);
*/

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

  if (currentUser) {
    updateUsersList(currentUser.username, "isLoggedIn", true);
    console.log(`${currentUser.username} logged in! ${currentUser.role}`);
  }
  console.log("Wrong username or password.");
};

export default Login;
