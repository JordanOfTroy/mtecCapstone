import '../styles/profile.css';
import { useEffect, useState } from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import SideBar from './SideBar.jsx';
import Header from './Header.jsx';



export default function Profile() {

    // Create a piece of state, and initialize it to `false`
    // `checked` will hold the current value of the state,
    // and `setChecked` will let us change it
    const [clicked, setClicked] = useState(true);
    const [user, setUser] = useState()

    useEffect(() => {
        console.log('WHAT IS HAPPENING???')
        let apiCalls = async () => {
            try {
                const rawUser = await fetch('/api/user', {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem('token')}` 
                    }
                })
                const parsedUser = await rawUser.json()
                console.log(parsedUser)
                setUser(parsedUser)
            } catch (err) {
                console.log('Fetching Error:', err)
            }
        }
        apiCalls()
    }, [])

    function handleEdit() {
        let firstName = document.getElementById('first_name').value;
        let lastName = document.getElementById('last_name').value
        let email = document.getElementById('email').value;
        let telephone = document.getElementById('telephone').value;
        let address = document.getElementById('address').value;
        
        let apiCall = async () => {
            try {
                const rawUser = await fetch('/api/user', {
                    method: 'PUT',
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem('token')}` 
                    },
                    body: JSON.stringify({firstName, lastName, email, telephone, address} )
                })
                let parsedUser = await rawUser.json();
                setUser(parsedUser);
                setClicked(true);

            } catch (err) {
                console.log('FETCHING ERROR:', err)    
                    }
        }
        apiCall()
    }

    const handleUserInput = (e) => {
        const target = e.target.id;
        const value = e.target.value;
    
        // Update the user state with the new value
        setUser((prevUser) => ({
            ...prevUser,
            [target]: value,
        }));
    }

    const EditInfo = () => {
        
       return (
           <div>
               {clicked ? 
                    <div className="profileInfo">
                            <h4>Created date : </h4>
                            <label className="profileLabel" htmlFor="name">Name:</label>
                            <p id="name">{`${user.first_name} ${user.last_name}`}</p>
                            <label className="profileLabel" htmlFor="email">Email:</label>
                            <p id="email">Email</p>
                            <label className="profileLabel" htmlFor="telephone">Phone #:</label>
                            <p id="phone">Phone</p>
                            <label className="profileLabel" htmlFor="address">Address:</label>
                            <p id="address">Address</p>
                            <button onClick={()=>setClicked(false)} className="button glow-button">Edit</button>
                        </div>
                        :
                        <div className="inputBars">
                            <h4>Created date : </h4>
                            <label className="profileLabel" htmlFor="first_name">firstName:</label>
                            <input type="firstName" name="firstName" id="first_name" 
                                value={user.first_name}
                                onChange={(e) => handleUserInput(e)}
                            />
                            <label className="profileLabel" htmlFor="last_name">lastName:</label>
                            <input type="lastName" name="lastName" id="last_name" 
                                defaultValue={user.last_name}
                                onChange={(e) => handleUserInput(e)}
                            />
                            <label className="profileLabel" htmlFor="email">Email:</label>
                            <input type="email" name="email" id="email" 
                                defaultValue={user.email}
                                onChange={(e) => handleUserInput(e)}
                            />
                            <label className="profileLabel" htmlFor="telephone">Phone #:</label>
                            <input type="phone" name="phone" id="telephone" 
                                defaultValue={user.telephone}
                                onChange={(e) => handleUserInput(e)}
                            />
                            <label className="profileLabel" htmlFor="address">Address:</label>
                            <input type="address" name="address" id="address" 
                                defaultValue={user.address}
                                onChange={(e) => handleUserInput(e)}
                            />
                            <button onClick={()=>handleEdit()} className="button glow-button">Submit</button>
                        </div>
                }
           </div>
       )
   }
    return (
<>
    <div className="container">
        <SideBar/>
            <div className="profileMain">
                <div className="profileDashboard">
                    <Header title="Profile"/>
                </div>
                <div className='editInfo'>
                    <div className="profileImage">
                        <img className="rounded-circle shadow-4-strong" alt="avatar2" src='https://i.imgur.com/2uz4wi3.png' height='300' width='300' />
                    </div>
                    {/* <EditInfo></EditInfo> */}
                    {EditInfo()}
                </div>
            </div>
        </div>
</>

    )
};