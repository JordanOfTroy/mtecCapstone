import '../styles/login.scss'
import {Link} from 'react-router-dom'

export default function Login () {
    let handleLogin = () => {
        console.log('logging in')
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