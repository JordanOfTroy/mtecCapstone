import'../styles/main.css';
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function SideBar() {
    let location = useLocation()
    const navTo = useNavigate()
    let {id} = useParams()
    // const [user, setUser] = useState(location.state.user)

    // console.log(user)

    let handleLogout = async () => {
        console.log('logging_out')
        let rawResults = await fetch(`/api/logout/${id}`, {
            method: 'POST',
            headers: {"content-type": "application/json"}
        })
        console.log('RR-Status:', rawResults.status, typeof rawResults.status)
        if (rawResults.status == 200) {
            navTo('/', {state: {message: 'Thank you for visiting Blah. Please come see us again soon!'}})
        } else {
            console.log('something fucked up')
        }
    }

    // let adminStatus = location.state.user.is_admin
    return (
    <div className="sideBar">
        <div className='buttonBox'>
            <Link to='/home' className="button glow-button">Home</Link>
            <Link to='/admin' className="button glow-button">Admin</Link> 
            <Link to='/student' className="button glow-button">Student</Link>
            <button className="button glow-button">Courses</button>
        </div>
        <div className='buttonBox'>
            <button className="button glow-button" onClick={() => handleLogout()}>Logout</button>
        </div>
    </div>

    )
};