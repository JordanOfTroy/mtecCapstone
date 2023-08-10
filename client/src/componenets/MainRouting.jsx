import { Route, Routes } from "react-router"
import ProtectedRoutes from "./ProtectedRoutes";
import WelcomeBase from './WelcomeBase'
import StudentDash from './StudentDash.jsx';
import AdminDash from './AdminDash.jsx';
import Registration from './Registration.jsx';
import Courses from "./Courses.jsx";
import Profile from './Profile.jsx';
import StudentDetails from "./StudentDetails";


function MainRouting () {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn')
    const isAdmin = window.localStorage.getItem('isAdmin')
    return (
        <Routes>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/welcome' element={
                <ProtectedRoutes user={isLoggedIn} >
                    <WelcomeBase/>
                </ProtectedRoutes>
            } />
            <Route path='/student' element={
                <ProtectedRoutes user={isLoggedIn}>
                    <StudentDash/>
                </ProtectedRoutes>
            } />
            <Route path='/admin' element={
                <ProtectedRoutes user={isAdmin}>
                    <AdminDash/>
                </ProtectedRoutes>
            } />
            <Route path='/home' element={
                <ProtectedRoutes user={isLoggedIn}>
                    <WelcomeBase/>
                </ProtectedRoutes>
            } />
            <Route path='/courses' element={
                <ProtectedRoutes user={isLoggedIn}>
                    <Courses/>
                </ProtectedRoutes>
            }/>
            <Route path='/profile' element={
                <ProtectedRoutes user={isLoggedIn}>
                    <Profile/>
                </ProtectedRoutes>
            }/>
            <Route path='/studentDetails/:studentId' element={
                <ProtectedRoutes user={isAdmin}>
                    <StudentDetails/>
                </ProtectedRoutes>
            }/>
        </Routes>
    )
}

export default MainRouting