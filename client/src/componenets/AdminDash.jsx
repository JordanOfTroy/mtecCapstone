import '../styles/admin.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';

export default function AdminDash() {

    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])
    const [myStudents, setMyStudents] = useState([])
    const [isAddingUser, setIsAddingUser] = useState(false)


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
            // console.log(`~~~~~~~~`)
            // console.log(parsedStudents)
            // console.log(parsedCourses)
            // console.log(parsedMyStudents)
            // console.log(`~~~~~~~~`)

            const reducedMyStudents = parsedMyStudents.reduce((studentsArr, student) => {
                const existingStudent = studentsArr.find(stuObj => stuObj.id === student.id)
                if (existingStudent) {
                    existingStudent.courses.push({title: student.title, course_code: student.course_code})
                } else {
                    studentsArr.push({
                        first_name: student.first_name,
                        last_name: student.last_name,
                        id: student.id,
                        email: student.email,
                        courses: [{title: student.title, course_code: student.course_code}]
                    })
                }
                return studentsArr
            }, [])

            setStudents(parsedStudents)
            setCourses(parsedCourses)
            setMyStudents(reducedMyStudents)
            console.log(reducedMyStudents)
        } catch (err) {
            console.log('Fetching Error:', err)
        }
    }

    useEffect(() => {
        apiCalls()
    }, [])

    const createNewAdmin = async(obj) => {
        try {
            let rawResponse = await fetch('/api/newAdmin', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify(obj)
            })

            if (rawResponse.status == 200) {
                setIsAddingUser(false)
            }

        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }
    }

    const createNewStudent = async (obj) => {
        try {
            let rawResponse = await fetch('/api/newStudent', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify(obj)
            })

            if (rawResponse.status == 200) {
                setIsAddingUser(false)
            }

        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }
    }

    const handleCreateNewUser = () => {
        let firstName = document.getElementById('firstName').value
        let lastName = document.getElementById('lastName').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let telephone = document.getElementById('telephone').value
        let address = document.getElementById('address').value
        let radioButtons = document.getElementsByName('user_type_radio')
        let userType 
        for (let button in radioButtons) {
            if (radioButtons[button].checked) {
                userType = radioButtons[button].value
                break
            } 
        }
        let is_admin = userType === 'admin'

        /**Yes. this can be done in a single call. But that ain't how I set things up
         * and I want to get it working before I refactor the backend.
         * Fight me! RAWR!!!
         */
        if (is_admin) {
            createNewAdmin({firstName, lastName, email, password, telephone, address})
        } else {
            createNewStudent ({firstName, lastName, email, password, telephone, address})
        }

    }

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
            return (
                <tr key={i}>
                    <td>{student.id}</td>
                    <td>{`${student.last_name}, ${student.first_name} `}</td>
                    <td>
                        <ul className='myStudentsCourses'>
                        {
                            student.courses.map((course, i) => {
                                return <li>{course.title}</li>
                            })
                        }
                        </ul>
                    </td>
                    <td><Link to={`/studentDetails/${student.id}`}>Details</Link></td>
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
                    <td>{`${student.last_name}, ${student.first_name}`}</td>
                    <td>{student.email}</td>
                    <td><Link to={`/studentDetails/${student.id}`}>Details</Link></td>
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
            {
                !isAddingUser
                ?
                <div className="adminMain">
                    <div>
                        <button className="button glow-button" onClick={() => setIsAddingUser(true)}>Add New User</button>
                    </div>
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
                                    <th>Courses</th>
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
                :
                <div className="adminMain">
                    <div className='creatingNewUserForm'>
                        <div>
                            <label htmlFor="firstName"></label>
                            <input className='register' type="text" name="firstName" id="firstName" placeholder='First Name' />
                        </div>
                        <div>
                            <label htmlFor="lastName"></label>
                            <input className='register' type="text" name="lastName" id="lastName" placeholder='Last Name' />
                        </div>
                        <div>
                            <label htmlFor="email"></label>
                            <input className='register' type="email" name="email" id="email" placeholder='Email'/>
                        </div>
                        <div>
                            <label htmlFor="password"></label>
                            <input className='register' type="password" name="password" id="password" placeholder='Password'/>
                        </div>
                        <div>
                            <label htmlFor="telephone"></label>
                            <input className='register' type="telephone" name='telephone' id='telephone' placeholder='Phone #'/>
                        </div>
                        <div>
                            <label htmlFor="address"></label>
                            <input className='register' type="address" name="address" id="address" placeholder='Address'></input>
                        </div>
                        <div>
                            <input className='register_radio' type="radio" name="user_type_radio" id="student_radio" value='student' ></input>
                            <label htmlFor="address">Student</label>
                            <input className='register_radio' type="radio" name="user_type_radio" id="admin_radio" value='admin' ></input>
                            <label htmlFor="address">Admin</label>
                        </div>
                        
                        <div className="registerButton">
                            <button className="button glow-button" onClick={() => setIsAddingUser(false)}>Cancel</button>
                            <button className="button glow-button" onClick={() => handleCreateNewUser()}>Submit new user</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};
