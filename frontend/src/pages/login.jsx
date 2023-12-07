import React from 'react'
import '../styles/register.css'

import { validateForm } from '../helpers/validate'

export default function Login() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [formErrors, setFormErrors] = React.useState({})

    async function handleLogin(e) {
        e.preventDefault();

        const form_error = validateForm(username, password)
        setFormErrors(form_error)

        if (Object.keys(form_error).length !== 0) {
            console.log('Login Form Validation Error : ', Object.keys(form_error).length)
            return
        } else {
            console.log('No Login Form Validation Error : ', Object.keys(form_error).length)
        }

        try {
            const response = await fetch('/login', {
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body:JSON.stringify({
                    username: username,
                    password: password,
                })
            });
    
            if (response.status === 200) {
                console.log('Login Success : status code = ', response.status)
            } else {
                console.log('Login Failed : status code = ', response.status)
            }
        } catch (err) {
            console.log('Login Unexpected Error : \n\n', err)
        }
      }

    return (
        <div className='form-page'>
            <div className='form-box'><form>
                <div className='form-headings'>
                    <h1>Login</h1>
                    <p>Enter your email/username and password to login</p>
                </div>

                <div className='register-input-fields'>
                    <input onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        placeholder="Email or Username"
                        type="text" required
                    />
                    {formErrors.username && <p className='form-error-message'>{formErrors.username}</p>}
                </div>
                
                <div className='register-input-fields'>
                    <input onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Password"
                        type="password" required
                    />
                    {formErrors.password && <p className='form-error-message'>{formErrors.password}</p>}
                </div>

                <label for="remember_me">Remember me </label><input type="checkbox" id="remember_me" name="remember_me"/>

                <div className='register-input-fields'>
                    <button onClick={(e) => handleLogin(e)} type="submit">Login</button>
                </div>
            </form></div>
            
        </div>
    )
}