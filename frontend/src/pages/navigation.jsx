import { Outlet, Link } from "react-router-dom";

import ImgLogo from '../assets/logo.png';

import '../styles/navigation.css'

// The main navigation component, this is the root of the react-router-dom.
export default function Navigation() {
  return (
    <>
      <div id="navigation-panel">
        <img src={ImgLogo} width={'20em'} height={'20em'}></img>
        <h3>Home Finders</h3>

        <div id="navigation-bar">
          <Link className="react-router-link" to={`home`}>Home</Link>
          <Link className="react-router-link" to={`calculator`}>Mortgage Calculator</Link>
          <Link className="react-router-link" to={`units`}>Explore Homes</Link>
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
      </div>
    </>
  );
}