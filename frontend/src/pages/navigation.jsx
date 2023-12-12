import { Outlet, Link } from "react-router-dom";

import ImgLogo from '../assets/logo.png';

import '../styles/navigation.css'
import LoginPopup from "../components/LoginPopup";
import React from "react";

// The main navigation component, this is the root of the react-router-dom.
export default function Navigation() {
  const [visibleLoginForm, setVisibleLoginForm] = React.useState(false)

  const openLoginForm = () => setVisibleLoginForm(true)
  const closeLoginForm = () => setVisibleLoginForm(false)
    
  return (
    <>
      <div id="navigation-panel">
        <div className="logo" to={`home`}>
          {/* <img src={ImgLogo} width={'20em'} height={'20em'}></img>
          <h3>Home Finders</h3> */}
          <h2>Logo</h2>
        </div>

        <div id="navigation-bar">
          <Link className="react-router-link" to={`home`}>Explore Homes</Link>

          <div className="react-router-link" to={'#'}> Homebuyers Guide
            <div>
              <Link className="react-router-sub-link" to={`calculator`}>Loan Calculator</Link>
            </div>
          </div>
          
          <Link className="react-router-link" to={`about`}>About Us</Link>
          {/* <Link className="react-router-link" to={`units`}>Explore Homes</Link> */}

          <button id="admin-login-btn" onClick={() => openLoginForm()}>Admin Login</button>

          <div className="react-router-link" to={'#'}> &#11206;
            <div>
              <Link className="react-router-sub-link" to={`register`}>Register</Link>
              <Link className="react-router-sub-link" to={`login`}>Login</Link>
            </div>
          </div>

        </div>
      </div>

      <div>
        <Outlet />
        { visibleLoginForm && <LoginPopup closeLoginForm={closeLoginForm}/> }
      </div>
    </>
  );
}