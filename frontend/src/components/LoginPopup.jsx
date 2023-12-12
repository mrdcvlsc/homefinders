import '../styles/LoginPopup.css'

export default function LoginPopup({closeLoginForm}) {
    return (
        <div className='login-page-container'>
            <div className="login-div">
                <span className="login-btn-close" onClick={() => closeLoginForm()}>
                    <ion-icon name="close"></ion-icon>
                </span>

                <div className="login-form login">
                    <h2> Admin Login</h2>
                    <form action="#">

                        <div className="login-form-inputs">
                            <span className="login-form-icons">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input type="email" required/>
                            <label> Email </label>
                        </div>

                        <div className="login-form-inputs">
                            <span className="login-form-icons">
                                <ion-icon name="lock-closed"></ion-icon>
                            </span>
                            <input type="password" required/>
                            <label> Password </label>
                        </div>
                        <button type="submit" className="login-btn-submit"> Login </button>
                    </form>
                </div>
            </div>
        </div>
    )
}