import React from "react";

import { post } from "../requests/post";

import "../styles/forgot-password.css";

export default function ForgotPassword() {
  const [formsDisabled, setFormsDisabled] = React.useState(false);

  const [fourDigitNumber, setFourDigitNumber] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [retypedPassword, setRetypedPassword] = React.useState("");

  const [phase1, setPhase1] = React.useState(true);
  const [pahse1Err, setPhase1Err] = React.useState("");
  const [pahse2Err, setPhase2Err] = React.useState("");

  const handleSendCode = async (e) => {
    console.log("handle send code");
    setFormsDisabled(true);

    try {
      if (username === '') {
        throw new Error('Fillup Username Field')
      }

      const [ok, data] = await post("/generate-recovery-code", {
        username: username,
      });

      if (ok) {
        setPhase1(false);
      } else {
        throw new Error(data.msg);
      }
    } catch (err) {
      setPhase1Err(err.message);
    }

    setFormsDisabled(false);
  };

  const handleSubmit = async (e) => {
    console.log("handle submit code");
    setFormsDisabled(true);

    const json_payload = {
      username: username,
      new_password: newPassword,
      four_digit_code: Number(fourDigitNumber),
    };

    console.log("payload = ", json_payload);

    try {
      if (!fourDigitNumber) {
        throw new Error('Fillup 4 digit code')
      }

      if (!(fourDigitNumber >= 1000 && fourDigitNumber <= 9999)) {
        throw new Error('Only 4 digit code is allowed')
      }

      if (newPassword === '') {
        throw new Error('Fillup Password Field')
      }

      if (retypedPassword === '') {
        throw new Error('Re-type password')
      }

      if (newPassword.length < 8) {
        throw new Error('Password should be greater than/equal 8 characters long')
      }

      if (newPassword !== retypedPassword) {
        throw new Error('Retyped password did not match')
      }

      const [ok, data] = await post("/validate-recovery-code", json_payload);

      if (ok) {
        setFormsDisabled(true);
      } else {
        throw new Error(data.msg);
      }

      setPhase2Err('')
    } catch (err) {
      setPhase2Err(err.message);
      setFormsDisabled(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-form">
        <h1>Forgot Password?</h1>
        {phase1 ? (
          <>
            <p>Enter your homefinder username</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              disabled={!phase1 || formsDisabled}
              type="text"
              placeholder="username"
            />
            <button onClick={handleSendCode} className="homefinders-btn">
              Send Code
            </button>
            <p className="homefinders-color-error">{pahse1Err}</p>
          </>
        ) : (
          <>
            <p>
              Enter the 4 digit code sent to your homefinders user account
              registered email
            </p>

            <input
              onChange={(e) => setFourDigitNumber(e.target.value)}
              disabled={formsDisabled}
              type="number"
              placeholder="4 digit code"
            />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={formsDisabled}
              type="password"
              placeholder="New Password"
            />
            <input
              onChange={(e) => setRetypedPassword(e.target.value)}
              disabled={formsDisabled}
              type="password"
              placeholder="Re-Type Password"
            />
            {formsDisabled ? null : (
              <button onClick={handleSubmit} className="homefinders-btn">
                Submit
              </button>
            )}
            <p className="homefinders-color-error">{pahse2Err}</p>
          </>
        )}
      </div>
    </div>
  );
}
