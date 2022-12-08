const Deposit = (customer, amount, setNotif) => {
  console.log("deposit", customer, amount);
  if (amount < 0.01 || !amount) {
    console.log("deposit error", customer, amount);
    setNotif({
      status: "error",
      message: "Amount must be greater than 0.",
    });
    return;
  }

  if (isNaN(customer.balance)) {
    customer.balance = 0;
  }

  setNotif({
    status: "success",
    message: `Added ${amount} credits to ${customer.username.toUpperCase()}'s balance.`,
  });
  console.log(
    "deposit success",
    customer,
    amount,
    parseFloat(customer.balance) + parseFloat(amount)
  );
  return parseFloat(customer.balance) + parseFloat(amount);
};

export default Deposit;
