import'../styles/main.css';
import {Link, useNavigate, useLocation} from 'react-router-dom';


export default function SideBar() {
    let location = useLocation()
    const navTo = useNavigate()
  
    let isAdmin = window.localStorage.getItem('isAdmin')

    let handleLogout = async () => {
        console.log('logging_out')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('isAdmin')
        navTo('/', {state: {message: 'Thank you for visiting BLAH. Please visit us again soon!'}})
    }

    return (
    <div className="sideBar">
        <div className='buttonBox'>
            <Link to='/home' className="button glow-button">Home</Link>
            {
                isAdmin == 'true' ? // localStorage saves the value as a string, not a bool.
                <Link to='/admin' className="button glow-button">Admin</Link> :
                <Link to='/student' className="button glow-button">Student</Link>
            }
            <Link to="/courses" className="button glow-button">Courses</Link>
        </div>
        <div className='buttonBox'>
            <button className="button glow-button" onClick={() => handleLogout()}>Logout</button>
        </div>
    </div>

    )
};