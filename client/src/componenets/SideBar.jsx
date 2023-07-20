import'../styles/main.css';
import {Link} from 'react-router-dom';

export default function SideBar() {
    return (
    <div className="sideBar">
        <Link to='/home' className="button glow-button">Home</Link>
        <Link to='/student' className="button glow-button">Student</Link>
        <Link to='/admin' className="button glow-button">Admin</Link>
        <button className="button glow-button">Courses</button>
        
        <span></span>
        <span></span>
        <button className="button glow-button">Logout</button>
    </div>

    )
};