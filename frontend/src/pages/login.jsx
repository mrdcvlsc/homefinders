import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/register.css";

import { validateForm } from "../helpers/validate";
import { post_credentials } from "../requests/login_register";

export default function Login() {
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
      const [ok, data] = await post_credentials("/login", {
        username: username,
        password: password,
      });

      if (ok) {
        validation_result.success = data.msg;
        setFormCatch(validation_result);
        setDisable(false);
        navigate("/units");
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
    <div className="form-page">
      <div className="form-box">
        <form>
          <div className="form-headings">
            <h1>Login</h1>
            <p>Enter your email/username and password to login</p>
          </div>

          <div className="register-input-fields">
            <input
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              placeholder="Email or Username"
              type="text"
              required
              disabled={disable}
            />
            {formCatch.invalidUsername && (
              <p className="form-error-message">{formCatch.invalidUsername}</p>
            )}
          </div>

          <div className="register-input-fields">
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
              type="password"
              required
              disabled={disable}
            />
            {formCatch.invalidPassword && (
              <p className="form-error-message">{formCatch.invalidPassword}</p>
            )}
          </div>

          <label htmlFor="remember_me">Remember me</label>
          <input
            type="checkbox"
            id="remember_me"
            name="remember_me"
            disabled={disable}
          />

          <div className="register-input-fields">
            <button
              onClick={(e) => handleLogin(e)}
              type="submit"
              disabled={disable}
            >
              {" "}
              &#11119; Login
            </button>
            {formCatch.error && (
              <p className="form-error-message">{formCatch.error}</p>
            )}
            {formCatch.success && (
              <p className="form-success-message">{formCatch.success}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
