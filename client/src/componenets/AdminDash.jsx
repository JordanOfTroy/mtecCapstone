import '../styles/admin.css';
import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';

export default function AdminDash() {

    const [students, setStudents] = useState()
    const [courses, setCourses] = useState()
    const [myStudents, setMyStudents] = useState()


    let apiCalls = async () => {
        try {
            const rawStudents = await fetch('/api/students', {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}` 
                }
            })
            const rawCourses = await fetch('/api/coursesImTeaching', {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
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

    useEffect(() => {
        apiCalls()
    }, [])

    let myCourses
    if (courses && courses.length > 0) {
        myCourses = courses.map((course, i) => {
            return (
                <tr key={i}>
                    <td>{course.title}</td>
                    <td className="description">{course.description}</td>
                    <td>{course.course_code}</td>
                    <td>{`${course.start_time} - ${course.end_time}`}</td>
                    <td>{course.credit_hours}</td>
                    <td>{course.capacity}</td>
                    <td>{course.days_of_week}</td>
                    <td>{course.room_number}</td>
                </tr>
            )
        })
    }

    let myStudentList
    if (myStudents && myStudents.length > 0) {
        myStudentList = myStudents.map((student, i) => {
            console.log(student.id)
            return (
                <tr key={i}>
                    <td>{student.id}</td>
                    <td>{`${student.first_name} ${student.last_name}`}</td>
                    <td>{student.email}</td>
                    <td><button>Details</button></td>
                </tr>
            )
        })
    }

    let allStudents
    if (students && students.length > 0) {
        allStudents = students.map((student, i) => {
            return (
                <tr key={i}>
                     <td>{student.id}</td>
                    <td>{`${student.first_name} ${student.last_name}`}</td>
                    <td>{student.email}</td>
                    <td><button>Details</button></td>
                </tr>
            )
        })
    }

    return (
        <div className="container">
            <SideBar/>
            <div className="adminDashboard">
                <Header title="Dashboard"/>
            </div>
            <div className="adminMain">
                <div>
                    <h3>My Courses</h3>
                    <div className="adminTable">    
                        <table>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Course Code</th>
                                <th>Time</th>
                                <th>Credit Hours</th>
                                <th>Capacity</th>
                                <th>Days</th>
                                <th>RoomNumber</th>
                            </tr>
                            {myCourses}
                        </table>
                    </div>
                </div>
                <div>
                    <h3>My Students</h3>
                    <div className="adminTable">
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>View Details</th>
                            </tr>
                            {myStudentList}
                        </table>
                    </div>
                </div>
                <div>
                    <h3>All Students</h3>
                    <div className="adminTable">
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>View Details</th>
                            </tr>
                            {allStudents}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};
