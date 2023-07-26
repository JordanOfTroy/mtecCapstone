import { Route, Routes } from "react-router"
import WelcomeBase from './WelcomeBase'
import StudentDash from './StudentDash.jsx';
import AdminDash from './AdminDash.jsx';
import Registration from './Registration.jsx';


function MainRouting () {
    return (
        <Routes>
            <Route path='/welcome' element={<WelcomeBase/>} />
            <Route path='/student' element={<StudentDash/>} />
            <Route path='/admin' element={<AdminDash/>} />
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/home' element={<WelcomeBase/>} />
        {/* <Route path='/courses' element={<Courses/>}/> */}
        </Routes>
    )
}

export default MainRouting