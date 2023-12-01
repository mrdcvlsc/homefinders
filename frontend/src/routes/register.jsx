import React from 'react'
import '../styles/register.css'

import { validateForm } from '../helpers/validate'

export default function Registration() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [retyped, setRetyped] = React.useState('')
    const [formErrors, setFormErrors] = React.useState({})

    async function handleRegister(e) {
        e.preventDefault();

        const form_error = validateForm(username, password, retyped)
        setFormErrors(form_error)

        if (Object.keys(form_error).length !== 0) {
            console.log('Registration Form Validation Error : ', Object.keys(form_error).length)
            return
        } else {
            console.log('No Registration Form Validation Error : ', Object.keys(form_error).length)
        }

        try {
            const response = await fetch('/register', {
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
                console.log('Register Success : status code = ', response.status)
            } else {
                console.log('Register Failed : status code = ', response.status)
            }
        } catch (err) {
            console.log('Register Unexpected Error : \n\n', err)
        }
      }

    return (
        <div className='form-page'>
            <div className='form-box'><form onSubmit={handleRegister}>
                <div className='form-headings'>
                    <h1>Registration Page</h1>
                </div>

                <div className='register-input-fields'>
                    <input onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        placeholder="Username or Email"
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

                <div className='register-input-fields'>
                    <input onChange={(e) => setRetyped(e.target.value)}
                        name="retyped"
                        placeholder="Re-typed Password"
                        type="password" required
                    />
                    {formErrors.retyped && <p className='form-error-message'>{formErrors.retyped}</p>}
                </div>

                <div className='register-input-fields'>
                    <button onClick={(e) => handleRegister(e)} type="submit">Register</button>
                </div>
            </form></div>
        </div>
    )
}