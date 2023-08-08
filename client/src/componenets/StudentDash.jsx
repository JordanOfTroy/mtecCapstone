import { useEffect, useState } from 'react';
import '../styles/student.css';
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';
import {Link, useNavigate, useLocation} from 'react-router-dom';


export default function StudentDash() {

    const [courses, setCourses] = useState([])

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
                console.log(`~~~~~~`)
                console.log(parsedCourses)
                console.log(`~~~~~~`)
                setCourses(parsedCourses)
            } catch (err) {
                console.log('Fetching Error:', err)
            }
        }
        apiCalls()
    }, [])
    let myCourses
    // console.log(courses.length)
    if (courses.length > 0) {
        myCourses = courses.map((course, i) => {
            console.log(course)
            return (
                <tr key={i}>
                    <td>{course.title}</td>
                    <td className="description">{course.description}</td>
                    <td>{course.course_code}</td>
                    <td>Teacher</td>
                    <td>
                        <input type="checkbox" value={`${course.id}`} className="selectedCourse" id='checkbox'></input>
                    </td>
                </tr>
            )
        })
    }
    const handleCourseRemoval = async () => {
        let selectedCourses = document.getElementsByClassName('selectedCourse');
        let removing = [];
        for (let i = 0; i < selectedCourses.length; i++){
            if (selectedCourses[i].checked){
                removing.push(selectedCourses[i].value)
            }
        }
        try {
            const rawCourses = await fetch('/api/dropCourse', {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}` // added when using auth in end point we we can check req.auth
                 },
                body: JSON.stringify({removing})
            })
        }catch(err){

        }

    }
    return (
<>
    <div className="container">
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
                        <th>Course Code</th>
                        <th>Teacher</th>
                        <th>Drop?</th>
                    </tr>
                    {courses.length > 0 ? myCourses : <tr></tr>}

                </table>
            </div>
            <div className="coursesButton">
                <h4>Want to add more courses? </h4>
                <Link to="/courses" className="button glow-button">Courses</Link>
                <h4>Remove selected courses?</h4>
                <button onClick={()=> handleCourseRemoval()} className="button glow-button">Remove</button>
            </div>
            
        </div>
    </div>
</>

    )
};
