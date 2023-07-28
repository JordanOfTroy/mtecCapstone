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
                <Header title="Current courses" />
            </div>
            <h3>You are enrolled in:</h3>
            <div className="studentTable">
                <table>
                    <tr>
                        <th>Course</th>
                        <th>Description</th>
                        <th>Time</th>
                        <th>Credit Hours</th>
                    </tr>
                    <tr>
                        <td>Rolling your own</td>
                        <td className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt voluptatem mollitia placeat necessitatibus facilis sit fuga maxime eius quis esse nostrum alias vel consectetur, facere temporibus tempore aperiam dolores similique.</td>
                        <td>3 pm</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Rolling your own</td>
                        <td className="description">"Can currently fit 10 courses before forcing page expansion"</td>
                        <td>3 pm</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Rolling your own</td>
                        <td className="description">"Description"</td>
                        <td>3 pm</td>
                        <td>3</td>
                    </tr>
                </table>
            </div>
            <div className="coursesButton">
                <h3>Want to add more courses? </h3>
                <button className="button glow-button">Courses</button>
            </div>
        </div>
    </div>
</>

    )
};
