import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { validateForm } from "../helpers/validate";
import { post_with_credentials } from "../requests/post";

import "../styles/LoginPopup.css";

export default function LoginPopup({ getLoggedInUser }) {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formCatch, setFormCatch] = React.useState({});
  const [disable, setDisable] = React.useState(false);

  async function handleLogin(e) {
    setDisable(true);
    e.preventDefault();

    const validation_result = validateForm(username, password, null, null);
    setFormCatch(validation_result);

    if (Object.keys(validation_result).length !== 0) {
      console.log(
        "Login Form Validation Error : ",
        Object.keys(validation_result).length,
      );
      setDisable(false);
      return;
    } else {
      console.log(
        "No Login Form Validation Error : ",
        Object.keys(validation_result).length,
      );
    }

    try {
      const [ok, data] = await post_with_credentials("/login", {
        username: username,
        password: password,
      });

      if (ok) {
        validation_result.success = data.msg;
        setFormCatch(validation_result);
        setDisable(false);
        getLoggedInUser();
        navigate("listing");
        return;
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      validation_result.error = err.message;
    }

    setFormCatch(validation_result);
    setDisable(false);
  }

  return (
    <div className="login-page-container">
      <div className="login-div">
        <span className="login-btn-close" onClick={() => navigate('/')}>
          <ion-icon name="close"></ion-icon>
        </span>

        <div className="login-form login">
          <h2> Admin Login</h2>
          <form action="#">
            <div className="login-form-inputs">
              <span className="login-form-icons">
                <ion-icon name="mail"></ion-icon>
              </span>
              <input
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                required
                disabled={disable}
              />
              {formCatch.invalidUsername && (
                <p className="form-error-message">
                  {formCatch.invalidUsername}
                </p>
              )}
              <label> Email </label>
            </div>

            <div className="login-form-inputs">
              <span className="login-form-icons">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                required
                disabled={disable}
              />
              {formCatch.invalidPassword && (
                <p className="form-error-message">
                  {formCatch.invalidPassword}
                </p>
              )}
              <label> Password </label>
            </div>
            <button
              onClick={(e) => handleLogin(e)}
              type="submit"
              className="login-btn-submit"
              disabled={disable}
            >
              {" "}
              Login
            </button>
            <Link to={'/forgot-password'}>Forgot Password</Link>
            
            {formCatch.error && (
              <p className="form-error-message">{formCatch.error}</p>
            )}
            {formCatch.success && (
              <p className="form-success-message">{formCatch.success}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
