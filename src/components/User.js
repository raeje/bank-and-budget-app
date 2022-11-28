class User {
  constructor(
    username,
    password,
    fName,
    lName,
    balance,
    mobileNum,
    acctNum,
    role,
    isLoggedIn
  ) {
    this.username = username;
    this.password = password;
    this.fName = fName;
    this.lName = lName;
    this.balance = balance;
    this.mobileNum = mobileNum;
    this.acctNum = acctNum;
    this.role = role;
    this.isLoggedIn = isLoggedIn;
  }
}

export default User;
