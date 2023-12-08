import React from 'react'
import '../styles/register.css'

import { validateForm } from '../helpers/validate'

export default function Registration() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [retyped, setRetyped] = React.useState('')
    const [formCatch, setFormCatch] = React.useState({})
    const [disable, setDisable] = React.useState(false)

    async function handleRegister(e) {
        setDisable(true)
        e.preventDefault();

        const validation_result = validateForm(username, password, retyped)
        setFormCatch(validation_result)

        if (Object.keys(validation_result).length !== 0) {
            console.log('Registration Form Validation Error : ', Object.keys(validation_result).length)
            setDisable(false)
            return
        } else {
            console.log('No Registration Form Validation Error : ', Object.keys(validation_result).length)
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
                validation_result.success = 'Registration successful'
            }

            if (response.status === 400) {
                throw new Error('*Bad request, body might be corrupted or maliciously altered')
            }

            if (response.status === 403) {
                throw new Error('*That username or email is taken')
            }

            if (response.status === 500) {
                throw new Error('*Internal server error')
            }
        } catch (err) {
            validation_result.error = err.message
        }
        
        setFormCatch(validation_result)
        setDisable(false)
    }

    return (
        <div className='form-page'>
            <div className='form-box'><form>
                <div className='form-headings'>
                    <h1>Registration</h1>
                    <p>Fill up this form to create an account</p>
                </div>

                <div className='register-input-fields'>
                    <input onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        placeholder="Email or Username"
                        type="text" required
                        disabled={disable}
                    />
                    {formCatch.invalidUsername && <p className='form-error-message'>{formCatch.invalidUsername}</p>}
                </div>
                
                <div className='register-input-fields'>
                    <input onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Password"
                        type="password" required
                        disabled={disable}
                    />
                    {formCatch.invalidPassword && <p className='form-error-message'>{formCatch.invalidPassword}</p>}
                </div>

                <div className='register-input-fields'>
                    <input onChange={(e) => setRetyped(e.target.value)}
                        name="retyped"
                        placeholder="Confirm Password"
                        type="password" required
                        disabled={disable}
                    />
                    {formCatch.passwordMismatched && <p className='form-error-message'>{formCatch.passwordMismatched}</p>}
                </div>

                <div className='register-input-fields'>
                    <button onClick={(e) => handleRegister(e)} type="submit" disabled={disable}>Sign Up</button>
                    {formCatch.error && <p className='form-error-message'>{formCatch.error}</p>}
                    {formCatch.success && <p className='form-success-message'>{formCatch.success}</p>}
                </div>
            </form></div>
        </div>
    )
}