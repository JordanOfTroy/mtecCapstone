import { useEffect, useState } from 'react';
import '../styles/student.css';
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';
import {Link, useNavigate, useLocation} from 'react-router-dom';


export default function StudentDash() {
    const navTo = useNavigate()
    const [courses, setCourses] = useState([])
    const [admins, setAdmins] = useState([])

    let fetchData = async () => {
        try {
            const rawCourses = await fetch('/api/myCourses/null', {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}` // added when using auth in end point we we can check req.auth
                 }
            })

            const rawAdmins = await fetch('/api/admins', {
                method:'GET',
                headers: {
                    "content-type": "application/json"
                }
            }) 

            const parsedCourses = await rawCourses.json()
            const parsedAdmins = await rawAdmins.json()
            // console.log(`~~~~~~`)
            // console.log(parsedCourses)
            // console.log(parsedAdmins)
            // console.log(`~~~~~~`)
            setCourses(parsedCourses)
            setAdmins(parsedAdmins)
        } catch (err) {
            console.log('Fetching Error:', err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    let myCourses
    if (courses.length > 0) {

        const teacherMap = {};
        admins.forEach(admin => {
            teacherMap[admin.id] = `${admin.first_name} ${admin.last_name}`;
        });
        // console.log(teacherMap)
        myCourses = courses.map((course, i) => {
            const teacherName = teacherMap[course.teacher_id] || 'No Assigned Teacher'
            return (
                <tr key={i}>
                    <td>{course.title}</td>
                    <td className="description">{course.description}</td>
                    <td>{course.course_code}</td>
                    <td>{teacherName}</td>
                    <td>
                        <input type="checkbox" value={`${course.id}`} className="selectedCourse" id='checkbox'></input>
                    </td>
                </tr>
            )
        })
    }
    console.log(courses)
    const handleCourseRemoval = async () => {
        let selectedCourses = document.getElementsByClassName('selectedCourse');
        let removedCourses = [];
        for (let i = 0; i < selectedCourses.length; i++){
            if (selectedCourses[i].checked){
                removedCourses.push(selectedCourses[i].value)
            }
        }
        try {
            const rawResponse = await fetch('/api/dropCourse', {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                 },
                body: JSON.stringify({removedCourses})
            })
            if (rawResponse.status == 200) {
                fetchData()
            }
        }catch(err){
            console.log('FETCHING ERROR:', err)
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
