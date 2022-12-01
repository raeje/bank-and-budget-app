const Withdraw = (customer, amount, setNotif) => {
  if (amount < 0.01 || !amount) {
    setNotif({
      status: "error",
      message: "Amount must be greater than 0.",
    });
    return;
  }

  setNotif({
    status: "success",
    message: `Transaction complete!
    Deducted ${amount} credits to ${customer.username.toUpperCase()}'s balance.`,
  });
  return parseFloat(customer.balance) - parseFloat(amount);
};

export default Withdraw;
