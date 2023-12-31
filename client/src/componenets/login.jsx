// import '../styles/login.scss';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { useState } from 'react';



export default function Login () {
    const location = useLocation()
    const navTo = useNavigate()

    let handleLogin = async () => {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let rawResult = await fetch('/api/login', {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({email, password})
        })
        
        // Example of what is happening here: https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
        if (rawResult.status == 200) {
            let parsedResults = await rawResult.json()
            window.localStorage.setItem('isAdmin', parsedResults.isAdmin)
            window.localStorage.setItem('token', parsedResults.token)
            window.localStorage.setItem('isLoggedIn', true)
            navTo(`/welcome`, {
                state:{
                    user: parsedResults
                }
            })
        } else {
            navTo('/registration', {
                state:{
                    message: 'Please Register before you login.',
                    props: {
                        email: email
                    }
                }
            })
        }

    }

    

    let message = location.state ? <h2>{location.state.message}</h2> : <h1>Please Login</h1>

    return (
        <div className="login">
            {message}
            <div>
                <label htmlFor="email"></label>
                <input type="email" name='email' id='email' placeholder="Email:" />
                <label htmlFor="password"></label>
                <input type="password" name='password' id='password' placeholder="Password:"/>
            </div>
            <div className="buttons">
                <button onClick={() => handleLogin()} className="button glow-button">Login</button>
                <Link to='/registration' className="signUp">Sign Up</Link>
            </div>
        </div>
    )
}