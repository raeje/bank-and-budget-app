import { useNavigate } from "react-router-dom";

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

const getLocalBudget = () => {
  let budget = localStorage.getItem("budget");
  budget = budget ? JSON.parse(localStorage.budget) : [];
  return budget;
};

const getFilteredBudgetList = (key, value) => {
  const budgetList = getLocalBudget();
  let filteredList = [];
  filteredList = budgetList.filter((budget) => budget[key] === value);
  return filteredList;
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
    setNotif({ status: "error", message: `${key} is required.` });
    return false;
  }

  if (key === "Balance") {
    if (val <= 0) {
      setNotif({ status: "error", message: `${key} must be greater than 0.` });
      return false;
    }
    return true;
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
      setNotif({
        status: "error",
        message: `Invalid username ('${username}'); must be at least 3 characters long`,
      });
      return false;
    }
    // username already exists
    const user = getFilteredUsersList("username", username)[0];
    if (user && user.username === username) {
      setNotif({
        status: "error",
        message: `Invalid username ('${username}'); already exists.`,
      });
      return false;
    }
    return true;
  }

  if (key === "Password") {
    if (val.length < 8) {
      setNotif({
        status: "error",
        message: `Invalid password; must be at least 8 characters long.`,
      });
      return false;
    }
    return true;
  }

  return true;
};

const authenticateUser = (tabs, childURL, role) => {
  if (!tabs.map((tab) => tab.icon).includes(childURL)) {
    const navigate = useNavigate();
    navigate("/error-page", {
      state: { type: "not-allowed", url: childURL, role: role },
    });
  }
};

const getSavedTheme = () => {
  const savedTheme = JSON.parse(localStorage.getItem("darkTheme"));
  return savedTheme;
};

export {
  getUsers,
  getCurrentUser,
  getUserTabs,
  getFilteredUsersList,
  updateLocalStorage,
  updateUsersList,
  getLocalBudget,
  getFilteredBudgetList,
  generateAcctNum,
  validateFields,
  domValue,
  authenticateUser,
  getSavedTheme,
};
