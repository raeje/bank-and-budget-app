import { getUsers } from "../utils";

let users = getUsers();
console.log(users);
users.forEach((user) =>
  console.log(`username: ${user.username} isLoggedIn: ${user.isLoggedIn}`)
);

const Login = (props) => {
  const username = props.username;
  const password = props.password;
  let currentUser = undefined;

  //console.log(props, props.username, props.password);
  users.forEach((user, index) => {
    if (username === user.username && password === user.password) {
      user.isLoggedIn = true;
      localStorage.setItem("users", JSON.stringify(users));
      console.log(`${username} logged in!`);

      currentUser = user;
    }

    if (index === users.length - 1 && !currentUser) {
      console.log(`Login failed. Wrong username or password.`);
    }
  });

  return currentUser;
};

export default Login;
