import { useState, useEffect } from 'react';
import'../styles/courses.scss';
import {Link} from 'react-router-dom';
import SideBar from './SideBar.jsx';
import Header from './Header.jsx';




export default function Courses() {

    const [allCourses, setAllCourses] = useState([])
    const[addingCourse, setAddingCourse] = useState(false)
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        let apiCalls = async () => {
            try {
                const rawCourses = await fetch('/api/courses', {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json"
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
                
                setAllCourses(parsedCourses)
                setAdmins(parsedAdmins)
            } catch (err) {
                console.log('Fetching Error:', err)
            }
        }
        apiCalls()
    }, [])


    const handleDeleteCourse = async (courseId) => {
        try {
            let results = await fetch(`/api/courses/${courseId}`, {
                method: 'DElETE',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
            })
            if (results.status == 200) {
                let parsedResults = await results.json()
                setAllCourses(parsedResults)
            }
        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }
    }

    let courses
    if (allCourses.length > 0) {
        courses = allCourses.map((course, i) => {
            return (
                <tr key={i}>
                    <td>{course.title}</td>
                    <td className="description">{course.description}</td>
                    <td>{course.course_code}</td>
                    <td>Time</td>
                    <td>Teacher</td>
                    <td>{
                        window.localStorage.getItem('isAdmin') === 'true'
                        ?
                        <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                        :
                        <input type='checkbox' className='selectedCourse' value={course.id}></input>
                        }</td>
                </tr>
            )
        })
    
    }

    const adminOptions = admins.map((admin, i) => {
        return <option key={i} value={admin.id}>{admin.first_name} {admin.last_name}</option>
    })

    const handleCourseSubmission = async () => {
        let title = document.getElementById('title').value
        let description = document.getElementById('description').value
        let course_code = document.getElementById('course_code').value
        let credit_hours = document.getElementById('credit_hours').value
        let tuition = document.getElementById('tuition').value
        let capacity = document.getElementById('capacity').value
        let teacher_id = document.getElementById('teacher_id').value
        let start_time = document.getElementById('start_time').value
        let end_time = document.getElementById('end_time').value
        let days_of_week = ''
        let selectedDays = document.getElementsByClassName('selectedDays')
        for (let i=0; i<selectedDays.length; i++) {
            if (selectedDays[i].checked) {
                days_of_week += selectedDays[i].value
            }
        }
        let room_number = document.getElementById('room_number').value

        try {
            let postResults = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({title, description, course_code, credit_hours, tuition, capacity, teacher_id, start_time, end_time, days_of_week, room_number})
            })

            if (postResults.status == 200) {
                try {
                    let courses = await fetch('/api/courses', {
                        method: 'GET',
                        headers: {
                            "content-type": "application/json"
                        }
                    })
                    let parsedCourses = await courses.json()
                    setAllCourses(parsedCourses)
                    setAddingCourse(false)
                } catch (err) {
                    console.log('FETCHING ERROR:', err)
                }
            } else {
                console.log(postResults.status)
            }

        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }

    }

    return (
        <div className="container">
            <SideBar/>
            <div className="coursesMain">
                <div className="coursesDashboard">
                    <Header title="Course Wizard"/>
                </div>
                {!addingCourse ?
                <>
                <div className="searchBar">
                    <input className="search" placeholder='search by course title'></input>
                </div>
                <div className="courseTable">
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Course Code</th>
                            <th>Time</th>
                            <th>Teacher</th>
                            <th>Enroll</th>
                        </tr>
                        {allCourses.length>0 ? courses : <p>No courses</p>}
                        
                    </table>
                    
                </div>
                <button className="submitButton">Submit</button>
                </>
                :
                <div>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" id="description" />
                    </div>
                    <div>
                        <label htmlFor="course_code">Course Code</label>
                        <input type="text" name="course_code" id="course_code" />
                    </div>
                    <div>
                        <label htmlFor="credit_hours">Credit Hours</label>
                        <input type="number" name="credit_hours" id="credit_hours" />
                    </div>
                    <div>
                        <label htmlFor="tuition">Tuition</label>
                        <input type="number" name="tuition" id="tuition" />
                    </div>
                    <div>
                        <label htmlFor="capacity">Max Capacity</label>
                        <input type="number" name="capacity" id="capacity" />
                    </div>
                    <div>
                        <label htmlFor="teacher_id">Instructor</label>
                        <select type="text" name="teacher_id" id="teacher_id" >
                            <option unselectable='Please select an instructor'>Please select an instructor</option>
                            {adminOptions}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="room_number">Room Number</label>
                        <input type="text" name="room_number" id="room_number"/>
                    </div>
                    <div>
                        <label htmlFor="start_time">Start Time</label>
                        <input type="time" name="start_time" id="start_time" min='00:00' max='24:00'/>
                    </div>
                    <div>
                        <label htmlFor="end_time">End Time</label>
                        <input type="time" name="end_time" id="end_time" min='00:00' max='24:00'/>
                    </div>
                    <div>
                        <p htmlFor="course">Days</p>
                        <div>
                            <input type="checkbox" className='selectedDays' name="monday" id="monday" value='M' />
                            <label htmlFor="monday" >Monday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="tuesday" id="tuesday" value='T'/>
                            <label htmlFor="tuesday" >Tuesday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="wednesday" id="wednesday" value='W'/>
                            <label htmlFor="wednesday" >Wednesday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="thursday" id="thursday" value='R'/>
                            <label htmlFor="thursday" >Thursday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="friday" id="friday" value='F'/>
                            <label htmlFor="friday" >Friday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="saturday" id="saturday" value='S'/>
                            <label htmlFor="saturday" >Saturday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="sunday" id="sunday" value='S'/>
                            <label htmlFor="sunday" >Sunday</label>
                        </div>
                    </div>
                  
                </div>
                }
                {
                    !addingCourse && window.localStorage.getItem('isAdmin') === 'true'
                    ?
                    <button className="submitButton" onClick={() => setAddingCourse(true)}>Add Course</button>
                    :
                    <button className='submitButton' onClick={() => handleCourseSubmission()}>Submit</button>
                }
            </div>
            
        </div>
    )
};