import React from "react";

import { get_loggedin_user } from "../requests/get";

import "../styles/listing.css";

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
    <div className="listing-page">
      {user ? <h1>Welcome {user}!</h1> : <h1>Login first</h1>}

      <p>
        Hover on this page's button to see the options to manipulate and/or add
        real-estate units/properties
      </p>
    </div>
  );
}
