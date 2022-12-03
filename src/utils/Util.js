const getUsers = () => {
  let users = localStorage.getItem("users");
  users = users ? JSON.parse(localStorage.users) : [];
  return users;
};

const getCurrentUser = () => {
  let currentUser = undefined;
  const users = getUsers();
  users.forEach((user) => (user.isLoggedIn ? (currentUser = user) : undefined));
  return currentUser;
};

const getUserTabs = (user) => {
  //const user = getCurrentUser();
  if (!user) {
    return;
  }
  const tabs = {
    profile: { icon: "profile", text: "My Profile" },
    deposit: { icon: "deposit", text: "Deposit" },
    withdraw: { icon: "withdraw", text: "Withdraw" },
    transfer: { icon: "transfer", text: "Transfer" },
    budget: { icon: "budget", text: "Budget" },
    createUSer: { icon: "create-user", text: "CreateUser" },
  };

  const adminTabs = [tabs.profile, tabs.deposit, tabs.withdraw, tabs.transfer];
  const customerTabs = [tabs.profile, tabs.budget];

  return user.role === "admin" ? adminTabs : customerTabs;
};

const getFilteredUsersList = (key, value) => {
  const users = getUsers();
  let filteredList = [];

  filteredList = users.filter((user) => user[key].includes(value));
  return filteredList;
};

const updateLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  console.log(
    "Local storage updated!",
    "\n",
    `key:  ${key}`,
    "\n",
    `data: ${data}`
  );
};

const updateUsersList = (username, item, value) => {
  let users = getUsers();
  const updatedList = users.map((user) => {
    if (user.username === username) {
      user[item] = value;
    }
    return user;
  });
  updateLocalStorage("users", updatedList);
  console.log(`Updated ${username.toUpperCase()}'s ${item} to ${value}!`);
};

export {
  getUsers,
  getCurrentUser,
  getUserTabs,
  getFilteredUsersList,
  updateLocalStorage,
  updateUsersList,
};
