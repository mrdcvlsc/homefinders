import React from "react";

import { get_loggedin_user } from "../requests/get";

import "../styles/units.css";

export default function Listing() {
  const [user, setLoggedInUser] = React.useState("");
  const [whoMsg, setWhoMsg] = React.useState("");

  React.useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const [ok, data] = await get_loggedin_user();

        if (ok) {
          setLoggedInUser(data.user);
          setWhoMsg(data.msg);
        } else {
          setLoggedInUser("");
          throw new Error(data.msg);
        }
      } catch (err) {
        setWhoMsg(err.message);
      }
    };

    checkLoggedInUser();
  }, []);

  return (
    <div>
      {user ? <h1>Currently Logged-In User : {user}</h1> : <h1>Login first</h1>}
    </div>
  );
}
