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

const getUserTabs = () => {
  const user = getCurrentUser();
  const tabs = {
    profile: { icon: "profile", text: "Profile" },
    deposit: { icon: "deposit", text: "Deposit" },
    withdraw: { icon: "withdraw", text: "Withdraw" },
    transfer: { icon: "transfer", text: "Transfer" },
    budget: { icon: "budget", text: "Budget" },
  };

  const adminTabs = [tabs.profile, tabs.deposit, tabs.withdraw, tabs.transfer];
  const customerTabs = [tabs.profile, tabs.budget];

  return user.role === "admin" ? adminTabs : customerTabs;
};

export { getUsers, getCurrentUser, getUserTabs };
