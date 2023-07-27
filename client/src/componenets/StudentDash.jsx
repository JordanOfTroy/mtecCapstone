import { useEffect, useState } from 'react';
import '../styles/student.css';
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';


export default function StudentDash() {

    const [courses, setCourses] = useState()

    useEffect(() => {
        let apiCalls = async () => {
            try {
                const rawCourses = await fetch('/api/myCourses', {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem('token')}` // added when using auth in end point we we can check req.auth
                     }
                })
                const parsedCourses = await rawCourses.json()
                // console.log(`~~~~~~`)
                // console.log(parsedCourses)
                // console.log(`~~~~~~`)
                setCourses(parsedCourses)
            } catch (err) {
                console.log('Fetching Error:', err)
            }
        }
        apiCalls()
    }, [])

    return (
<>
    <div class="container">
        <SideBar/>
        <div className="studentMain">
            <div className="studentDashboard">
                <Header title="Dashboard" />
            </div>
            <div className="studentTable">
                <table>
                    <tr>
                        <th>Course</th>
                        <th>Description</th>
                        <th>Time</th>
                        <th>Credit Hours</th>
                    </tr>
                    <tr>
                        <th>Rolling your own</th>
                        <th>"Description"</th>
                        <th>3 pm</th>
                        <th>3</th>
                    </tr>
                    <tr>
                        <th>Rolling your own</th>
                        <th>"Description"</th>
                        <th>3 pm</th>
                        <th>3</th>
                    </tr>
                    <tr>
                        <th>Rolling your own</th>
                        <th>"Description"</th>
                        <th>3 pm</th>
                        <th>3</th>
                    </tr>
                </table>
            </div>
            <div className="coursesButton">
                <button className="button glow-button">oh no</button>
            </div>
        </div>
    </div>
</>

    )
};
