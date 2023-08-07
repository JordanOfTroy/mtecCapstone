import {useNavigate, useLocation} from 'react-router-dom'

export default function Registration () {
    const location = useLocation()
    const navTo = useNavigate()

    let handleRegistration = async () => {
        console.log('what the fuck')
        let firstName = document.getElementById('firstName').value
        let lastName = document.getElementById('lastName').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let telephone = document.getElementById('telephone').value
        let address = document.getElementById('address').value

        let rawResult = await fetch('/api/newStudent', {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({firstName, lastName, email, password, telephone, address})
        
        })
        console.log(rawResult.status)
        if (rawResult.status == 200) {
            let parsedResults = await rawResult.json()
            navTo('/', {state:{message: `Thank you for registering ${parsedResults.first_name}! Please login.`}})
        }

    }

    // let handleEmailChange = (e) => {
    //     console.log(e.target.value)
    // }

    let message = location.state ? <h1>{location.state.message}</h1> : <h1>Registration</h1>

    return (
        <div className="registration">
            
            <div className="message">{message}</div>
            <div>
                <div>
                    <label htmlFor="firstName"></label>
                    <input className='register' type="text" name="firstName" id="firstName" placeholder='First Name' />
                </div>
                <div>
                    <label htmlFor="lastName"></label>
                    <input className='register' type="text" name="lastName" id="lastName" placeholder='Last Name' />
                </div>
                <div>
                    <label htmlFor="email"></label>
                    <input className='register' type="email" name="email" id="email" placeholder='Email'
                    // value={location.state ? location.state.props.email : null} 
                    // onChange={(e) => handleEmailChange(e)}
                    />
                    
                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input className='register' type="password" name="password" id="password" placeholder='Password'/>
                </div>
                <div>
                    <label htmlFor="telephone"></label>
                    <input className='register' type="telephone" name='telephone' id='telephone' placeholder='Phone #'/>
                </div>
                <div>
                    <label htmlFor="address"></label>
                    <input className='register' type="address" name="address" id="address" placeholder='Address'></input>
                </div>
                
                <div className="registerButton">
                    <button className="button glow-button" onClick={() => handleRegistration()}>Register as Student</button>
                </div>
            </div>
        </div>
    )
}