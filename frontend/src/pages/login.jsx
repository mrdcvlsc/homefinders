import React from 'react'
import { useNavigate } from 'react-router-dom';

import '../styles/register.css'

import { validateForm } from '../helpers/validate'

export default function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [formCatch, setFormCatch] = React.useState({})
    const [disable, setDisable] = React.useState(false)

    async function handleLogin(e) {
        setDisable(true)
        e.preventDefault();

        const validation_result = validateForm(username, password)
        setFormCatch(validation_result)

        if (Object.keys(validation_result).length !== 0) {
            console.log('Login Form Validation Error : ', Object.keys(validation_result).length)
            setDisable(false)
            return
        } else {
            console.log('No Login Form Validation Error : ', Object.keys(validation_result).length)
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
                validation_result.success = 'login successful'
                setFormCatch(validation_result)
                setDisable(false)
                navigate('/units')
                return
            }

            if (response.status === 400) {
                throw new Error('*Bad request, body might be corrupted or maliciously altered')
            }

            if (response.status === 401) {
                throw new Error('*Wrong password')
            }

            if (response.status === 404) {
                throw new Error('*User not found')
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
                    <h1>Login</h1>
                    <p>Enter your email/username and password to login</p>
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

                <label htmlFor='remember_me'>Remember me</label>
                <input type="checkbox" id="remember_me" name="remember_me" disabled={disable}/>

                <div className='register-input-fields'>
                    <button onClick={(e) => handleLogin(e)} type="submit" disabled={disable} >Login</button>
                    {formCatch.error && <p className='form-error-message'>{formCatch.error}</p>}
                    {formCatch.success && <p className='form-success-message'>{formCatch.success}</p>}
                </div>
            </form></div>
            
        </div>
    )
}