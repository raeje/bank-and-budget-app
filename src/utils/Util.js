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
    createUser: { icon: "create-user", text: "Create User" },
    userManagement: { icon: "user-management", text: "Manage Users" },
  };

  const adminTabs = [
    tabs.profile,
    tabs.userManagement,
    tabs.deposit,
    tabs.withdraw,
    tabs.transfer,
  ];
  const customerTabs = [tabs.profile, tabs.budget];

  return user.role === "admin" ? adminTabs : customerTabs;
};

const getFilteredUsersList = (key, value) => {
  const users = getUsers();
  let filteredList = [];
  console.log("debug", key, value, users);
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

const generateAcctNum = () => {
  const existingAcctNums = getUsers().map((u) => u.acctNum);
  const acctNum = () => {
    return String(Math.floor(Math.random(8) * 100000000));
  };

  let newAcctNum;
  let acctNumExists = true;
  while (acctNumExists) {
    newAcctNum = acctNum();
    acctNumExists = existingAcctNums.includes(newAcctNum);
    console.log(newAcctNum, acctNumExists);
  }

  return newAcctNum;
};

const domValue = (query) => {
  return document.querySelector(query).value;
};

const validateFields = (fields, setNotif, isNewUser = false) => {
  let result;
  fields.every((field) => {
    result = validateField(field, setNotif, isNewUser);
    if (!result) {
      return result;
    }
    return result;
  });
  return result;
};

const validateField = (field, setNotif, isNewUser) => {
  const [key, val] = [Object.keys(field)[0], Object.values(field)[0]];

  if (!val || val.length === 0) {
    console.log("validateField", key, false);
    setNotif({ status: "error", message: `${key} is required.` });
    return false;
  }

  if (key === "First Name") {
    setNotif({ status: "error", message: "First Name is required." });
    //return false;
  }

  if (key === "Last Name") {
    setNotif({ status: "error", message: "Last Name is required." });
    //return false;
  }

  if (key === "Mobile Number") {
    const [mobileNum, acctNum] = [...val];
    const message = `Invalid mobile number ('${mobileNum}')`;
    if (!mobileNum) {
      setNotif({ status: "error", message: `${key} is required.` });
      return false;
    }
    if (!isNewUser) {
      // mobileNum is unchanged
      const user = getFilteredUsersList("acctNum", acctNum)[0];
      if (user.mobileNum === mobileNum) {
        return true;
      }
    }
    // mobileNum length is below 11 digits
    if (mobileNum.length !== 11) {
      setNotif({
        status: "error",
        message: `${message}; must be 11 digits. Example: 09123456789`,
      });
      return false;
    }
    // mobileNum does not start with 09
    const regexp = new RegExp("^09");
    if (!regexp.test(mobileNum)) {
      setNotif({
        status: "error",
        message: `${message}; must start with '09'. Example: 09123456789`,
      });
      return false;
    }
    // mobileNum already exists
    const filteredUser = getFilteredUsersList("mobileNum", mobileNum)[0];
    if (filteredUser && filteredUser.mobileNum === mobileNum) {
      console.log(filteredUser);
      setNotif({
        status: "error",
        message: `${message}; already registered.`,
      });
      return false;
    }
    return true;
  }

  if (key === "Username") {
    const [username, acctNum] = [...val];
    if (!isNewUser) {
      // username is unchanged
      const filteredUser = getFilteredUsersList("acctNum", acctNum)[0];
      if (username === filteredUser.username) {
        return true;
      }
    }
    // username is empty
    if (!username || username.length === 0) {
      setNotif({ status: "error", message: "Username is required." });
      return false;
    }
    // username already exists
    const user = getFilteredUsersList("username", username)[0];
    if (user && user.username === username) {
      console.log("this should appear");
      setNotif({
        status: "error",
        message: `Invalid username ('${username}'); already exists.`,
      });
      return false;
    }
    return true;
  }

  if (key === "Password") {
    //setNotif({ status: "error", message: "Password is required." });
    //return false;
  }

  if (key === "Role") {
    //setNotif({ status: "error", message: "Role is required." });
    //return false;
  }

  return true;
};

export {
  getUsers,
  getCurrentUser,
  getUserTabs,
  getFilteredUsersList,
  updateLocalStorage,
  updateUsersList,
  generateAcctNum,
  validateFields,
  domValue,
};
