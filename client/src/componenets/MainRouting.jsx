import { Route, Routes } from "react-router"
import WelcomeBase from './WelcomeBase'
import StudentDash from './StudentDash.jsx';
import AdminDash from './AdminDash.jsx';
import Registration from './Registration.jsx';
import Courses from "./Courses.jsx";
import Profile from './Profile.jsx';

function MainRouting () {
    return (
        <Routes>
            <Route path='/welcome' element={<WelcomeBase/>} />
            <Route path='/student' element={<StudentDash/>} />
            <Route path='/admin' element={<AdminDash/>} />
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/home' element={<WelcomeBase/>} />
            <Route path='/courses' element={<Courses/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>
    )
}

export default MainRouting