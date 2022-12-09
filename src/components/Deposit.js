const Deposit = (customer, amount, setNotif) => {
  if (amount < 0.01 || !amount) {
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

  return parseFloat(customer.balance) + parseFloat(amount);
};

export default Deposit;
