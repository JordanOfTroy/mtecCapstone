import {useNavigate, useLocation} from 'react-router-dom'

export default function Registration () {
    const location = useLocation()
    const navTo = useNavigate()

    let handleRegistration = async () => {
        let firstName = document.getElementById('firstName').value
        let lastName = document.getElementById('lastName').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        let rawResult = await fetch('/api/newStudent', {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({firstName, lastName, email, password})
        
        })
        console.log(rawResult.status)
        if (rawResult.status == 200) {
            let parsedResults = await rawResult.json()
            navTo('/', {state:{message: `Thank you for registering ${parsedResults.first_name}! Please login.`}})
        }

    }

    let message = location.state ? <h1>{location.state.message}</h1> : <h1>Registration</h1>

    return (
        <div>
            
            {message}
            
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" name="firstName" id="firstName" />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" name="lastName" id="lastName" />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={location.state ? location.state.props.email : null}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" />
            </div>
            <button onClick={() => handleRegistration()}>Register as Student</button>
        </div>
    )
}