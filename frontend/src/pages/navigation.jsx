import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import ImgLogo from "../assets/logo.png";

import "../styles/navigation.css";
import LoginPopup from "../components/LoginPopup";
import React from "react";
import { get_loggedin_user, logout_request } from "../requests/login_register";

// The main navigation component, this is the root of the react-router-dom.
export default function Navigation() {
  const navigate = useNavigate();

  const [visibleLoginForm, setVisibleLoginForm] = React.useState(false);

  const openLoginForm = () => setVisibleLoginForm(true);
  const closeLoginForm = () => setVisibleLoginForm(false);

  const [user, setLoggedInUser] = React.useState("");
  const [whoMsg, setWhoMsg] = React.useState("");

  const getLoggedInUser = async () => {
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

  React.useEffect(() => {
    getLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      const [ok, data] = await logout_request();

      if (ok) {
        setLoggedInUser(data.user);
        setWhoMsg(data.msg);
        console.log("logout success response = ", whoMsg);
        navigate("home");
      } else {
        setLoggedInUser("");
        throw new Error(data.msg);
      }
    } catch (err) {
      console.log("logout failed response = ", whoMsg);
      setWhoMsg(err.message);
    }
  };

  return (
    <>
      <div id="navigation-panel">
        <div className="logo" to={`home`}>
          {/* <img src={ImgLogo} width={'20em'} height={'20em'}></img>
                <h3>Home Finders</h3> */}
          <h2>Logo</h2>
        </div>

        <div id="navigation-bar">
          <Link className="react-router-link" to={`home`}>
            Explore Homes
          </Link>

          <div className="react-router-link" to={"#"}>
            {" "}
            Homebuyers Guide
            <div>
              <Link className="react-router-sub-link" to={`calculator`}>
                Loan Calculator
              </Link>
            </div>
          </div>

          <Link className="react-router-link" to={`about`}>
            About Us
          </Link>

          {user && (
            <Link className="react-router-link" to={`listing`}>
              Listings
            </Link>
          )}

          {user ? (
            <button id="admin-login-btn" onClick={() => handleLogout()}>
              Logout
            </button>
          ) : (
            <button id="admin-login-btn" onClick={() => openLoginForm()}>
              Admin Login
            </button>
          )}

          <div className="react-router-link hidden-black" to={"#"}>
            &#11206;
            <div>
              <Link className="react-router-sub-link" to={`register`}>
                Register
              </Link>
              <Link className="react-router-sub-link" to={`login`}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Outlet />
        {visibleLoginForm && (
          <LoginPopup
            closeLoginForm={closeLoginForm}
            getLoggedInUser={getLoggedInUser}
          />
        )}
      </div>
    </>
  );
}
