import { useNavigate } from "react-router";
import '../styles/studentDetails.scss'

export default function UpdatingStudentView ({handleCancel, userInfo, setUpdatekey}) {
    const navTo = useNavigate()
    const {first_name, last_name, email, id, telephone, address} = userInfo

    const handleSubmitChanges = async () => {
        let firstName = document.getElementById('first_name').value;
        let lastName = document.getElementById('last_name').value
        let email = document.getElementById('email').value;
        let telephone = document.getElementById('phone').value;
        let address = document.getElementById('address').value;
        
        try {
            const rawUser = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}` 
                },
                body: JSON.stringify({firstName, lastName, email, telephone, address, id} )
            })
            let parsedUser = await rawUser.json();
            if (rawUser.status == 200) {
                setUpdatekey(prevKey => prevKey + 1)
                // navTo(`/studentDetails/${id}`)
                // navTo('/admin')
            } else {
                console.log('server error:', rawUser.status)
            }
        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }

    }

    return (
        <div className="updateStudent">
            <h1>Updating Student</h1>
            <div>
                <div className="inputGroup">
                    <label>First name:</label>
                    <input className="inputUpdateStudent" type="text" id='first_name' defaultValue={first_name}></input>
                </div>
                <div className="inputGroup">
                    <label>Last name:</label>
                    <input className="inputUpdateStudent" type="text" id='last_name' defaultValue={last_name}></input>
                </div>
                <div className="inputGroup">
                    <label>Email:</label>
                    <input className="inputUpdateStudent" type="text" id='email' defaultValue={email}></input>
                </div>
                <div className="inputGroup">
                    <label>Phone:</label>
                    <input className="inputUpdateStudent" type="text" id='phone' defaultValue={telephone}></input>
                </div>
                <div className="inputGroup">
                    <label>Address:</label>
                    <input className="inputUpdateStudent" type="text" id='address' defaultValue={address}></input>
                </div>
            </div>
            <div className="updateButton">
                <button className="button glow-button" onClick={() => handleCancel()}>Cancel</button>
                <button className="button glow-button" onClick={() => handleSubmitChanges()}>Submit Changes</button>
            </div>
        </div>
    )
}