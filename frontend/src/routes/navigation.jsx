import { Outlet, Link } from "react-router-dom";

import ImgLogo from '../assets/logo.png';

import '../styles/navigation.css'

/// The main navigation component.
/// This is the navigation bar in our web app.
export default function Navigation() {
  return (
    <>
      <div id="navigation-panel">
        <img src={ImgLogo} width={'20em'} height={'20em'}></img>
        <h3>Home Finders</h3>

        <div id="navigation-bar">
          <div><Link to={`home`}>Home</Link></div>
          <div><Link to={`#`}>Admin</Link>
            <div>
              <div><Link to={`register`}>Register</Link></div>
              <div><Link to={`login`}>Login</Link></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
}