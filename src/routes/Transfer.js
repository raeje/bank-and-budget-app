import React, { useState } from "react";
import { UserLookup } from "../components";

const Transfer = () => {
  const [customer, setCustomer] = useState(undefined);
  const [notif, setNotif] = useState({ status: undefined, message: undefined });

  return (
    <>
      <UserLookup
        customer={customer}
        setCustomer={setCustomer}
        setNotif={setNotif}
      />
    </>
  );
};

export default Transfer;
