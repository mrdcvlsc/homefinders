import React from 'react'

export default function Registration() {
    const [username, setUsername] = React.useState(null)
    const [password, setPassword] = React.useState(null)
    const [retyped, setRetyped] = React.useState(null)

    async function register(e) {
        if (password < 8) {
            console.log('password should be greater or equal 8 characters')
        }

        if (password !== retyped) {
            console.log('password did not match')
            return
        } else {
            console.log('password match')
        }

        try {
            e.preventDefault();
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
                // success
            } else {
                // err
            }
        } catch (err) {
            // err
        }
      }

    return (
        <div>
            <h1>Registration Page</h1>
            <form>
                <input onChange={(e) => setUsername(e.target.value)}  name="username" type="text" />
                <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" />
                <input onChange={(e) => setRetyped(e.target.value)} name="retyped" type="password" />
                <button onClick={register} type="submit">Register</button>
            </form>
        </div>
    )
}