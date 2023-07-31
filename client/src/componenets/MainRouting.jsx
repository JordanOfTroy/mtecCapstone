import { Route, Routes } from "react-router"
import ProtectedRoutes from "./ProtectedRoutes";
import WelcomeBase from './WelcomeBase'
import StudentDash from './StudentDash.jsx';
import AdminDash from './AdminDash.jsx';
import Registration from './Registration.jsx';
import Courses from "./Courses.jsx";


function MainRouting () {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn')
    return (
        <Routes>
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
                    <ProtectedRoutes user={isLoggedIn}>
                        <AdminDash/>
                    </ProtectedRoutes>
                } />
                <Route path='/registration' element={
                    <ProtectedRoutes user={isLoggedIn}>
                        <Registration/>
                    </ProtectedRoutes>
                }/>
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
            
        </Routes>
    )
}

export default MainRouting