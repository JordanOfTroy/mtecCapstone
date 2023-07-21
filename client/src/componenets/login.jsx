import '../styles/login.scss'
import {Link, useNavigate} from 'react-router-dom'

export default function Login () {
    const navTo = useNavigate()

    let handleLogin = async () => {
        console.log('logging in')
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let rawResult = await fetch('/api/login', {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({email, password})
        })
        
        // Example of what is happening here: https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
        console.log(rawResult.status)
        if (rawResult.status == 200) {
            let parsedResults = await rawResult.json()
            navTo(`/welcome/${parsedResults.id}`, {state:{token: parsedResults.token}})
        } else {
            navTo('/registration', {state:{message: 'Please Register before you login.'}})
        }

    }


    return (
        <div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" name='email' id='email' />
                <label htmlFor="password">Password:</label>
                <input type="text" name='password' id='password' />
            </div>
            <div>
                <button onClick={() => handleLogin()}>Login</button>
                <Link to='/registration'>Sign Up</Link>
            </div>
        </div>
    )
}