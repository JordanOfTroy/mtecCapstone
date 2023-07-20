export default function Registration () {

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

        let resutls = await rawResult.json()
        console.log(resutls)
    }


    return (
        <div>
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
                <input type="text" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="text" name="password" id="password" />
            </div>
            <button onClick={() => handleRegistration()}>Register as Student</button>
        </div>
    )
}