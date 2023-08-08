import '../styles/admin.css';
import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';

export default function AdminDash() {

    const [students, setStudents] = useState()
    const [courses, setCourses] = useState()
    const [myStudents, setMyStudents] = useState()


    useEffect(() => {
        let apiCalls = async () => {
            try {
                const rawStudents = await fetch('/api/students', {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem('token')}` // added when using auth in end point we we can check req.auth
                    }
                })
                const rawCourses = await fetch('/api/coursesImTeaching', {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem('token')}` // added when using auth in end point we we can check req.auth
                    }
                })
                const rawMyStudents = await fetch('/api/getMyStudents', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`
                    }
                })

                const parsedStudents = await rawStudents.json()
                const parsedCourses = await rawCourses.json()
                const parsedMyStudents = await rawMyStudents.json()
                console.log(`~~~~~~~~`)
                console.log(parsedStudents)
                console.log(parsedCourses)
                console.log(parsedMyStudents)
                console.log(`~~~~~~~~`)
                setStudents(parsedStudents)
                setCourses(parsedCourses)
                setMyStudents(parsedMyStudents)
            } catch (err) {
                console.log('Fetching Error:', err)
            }
        }
        apiCalls()
    }, [])

    return (
<>
    <div className="container">
        <SideBar/>
        <div className="adminDashboard">
            <Header title="Dashboard"/>
        </div>
        <div className="adminMain">

            <h3>Students</h3>
            <div className="adminTable">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Remove Student?</th>
                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td><input type='checkbox' className='removeStudentCheckbox' id='checkbox'/></td>
                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td><input type='checkbox' className='removeStudentCheckbox' id='checkbox'/></td>

                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td><input type='checkbox' className='removeStudentCheckbox' id='checkbox'/></td>
                    </tr>
                </table>
            </div>
            
            <h3>Courses</h3>
            <div className="adminTable">    
                <table>
                <tr>
                        <th>Course Title</th>
                        <th>Credit Hours</th>
                        <th>Amount of Students</th>
                        </tr>
                    <tr>
                        <td>Course</td>
                        <td>Timey-Wimey</td>
                        <td>Lotso</td>
                    </tr>
                    <tr>
                        <td>Course</td>
                        <td>Timey-Wimey</td>
                        <td>Lotso</td>
                    </tr>
                    <tr>
                        <td>Course</td>
                        <td>Timey-Wimey</td>
                        <td>Lotso</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</>

    )
};
