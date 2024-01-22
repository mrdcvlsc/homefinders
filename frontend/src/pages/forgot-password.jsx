import React from "react"

import "../styles/forgot-password.css";

export default function ForgotPassword() {
    return (
        <div className="forgot-password-page">
            <div className="forgot-password-form">
                <h1>Forgot Password?</h1>
                <p>
                    Enter and submit the 4 digit code that will be sent to
                    your registered email along with your new password
                </p>
                <button className="homefinders-btn">Send Code</button>
                <input type="number" placeholder="4 digit code"/>
                <input type="password" placeholder="New Password"/>
                <input type="password" placeholder="Re-Type Password"/>
                <button className="homefinders-btn">Submit</button>
            </div>
        </div>
    )
}