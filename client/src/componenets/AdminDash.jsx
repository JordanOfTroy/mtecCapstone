import '../styles/admin.css';
import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';

export default function AdminDash() {

    const [students, setStudents] = useState()
    const [courses, setCourses] = useState()


    useEffect(() => {
        let apiCalls = async () => {
            let rawStudents = await fetch('/api/students', {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}` // added when using auth in end point we we can check req.auth
                 }
            })
            let rawCourses = await fetch('/api/courses', {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                }
            })
            let parsedStudents = await rawStudents.json()
            let parsedCourses = await rawCourses.json()
            // console.log(parsedStudents, parsedCourses)
        }
        apiCalls()
    })

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
                        <th>Classes Taken</th>
                        </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>2 Many</td>
                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>2 Many</td>
                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>2 Many</td>
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
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>Lotso</td>
                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>Lotso</td>
                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>Lotso</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</>

    )
};
