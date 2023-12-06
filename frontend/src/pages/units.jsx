import React from 'react'
import '../styles/units.css'

export default function Units() {
    const [user, setUser] = React.useState('')

    React.useEffect(() => {
        async function checkLoggedInUser() {
            const response = await fetch('/who', {
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'get',
            });

            console.log('response = ')
            console.log(response)
        
            if (response.status === 200) {
                console.log('response succeded')
                // a user is logged in
                const data = await response.json()
                console.log('logged in data = ')
                console.log(data)
                setUser(data.user)
            } else if (response.status === 401) {
                console.log('response succeded, but no one si logged in')
                setUser('Unauthorize')
            } else {
                console.log('internal server error')
                setUser('Internal Server Error')
            }
        }

        checkLoggedInUser()
    }, [])

    return (
        <div> { user ?
            <p>Welcome : {user}</p> :
            <p>No user logged in</p>
        }</div>
    )
}