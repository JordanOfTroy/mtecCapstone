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
                    <td><button ></button></td>
                </tr>
            )
        })
    
    }

    const adminOptions = admin.map((admin, i) => {
        return <option key={i} value={admin.id}>{admin.name}</option>
    })

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
                        {allCourses.length>0 ? courses : <tr></tr>}
                        
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
                        <input type="text" name="credit_hours" id="credit_hours" />
                    </div>
                    <div>
                        <label htmlFor="tuition">Tuition</label>
                        <input type="text" name="tuition" id="tuition" />
                    </div>
                    <div>
                        <label htmlFor="capacity">Max Capacity</label>
                        <input type="text" name="capacity" id="capacity" />
                    </div>
                    <div>
                        <label htmlFor="teacher_id">Instructor</label>
                        <select type="text" name="teacher_id" id="teacher_id" >
                            {adminOptions}
                        </select>
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
                            <input type="checkbox" className='selectedDays' name="monday" id="monday" />
                            <label htmlFor="monday" value='M'>Monday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="tuesday" id="tuesday" />
                            <label htmlFor="tuesday" value='T'>Tuesday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="wednesday" id="wednesday" />
                            <label htmlFor="wednesday" value='W'>Wednesday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="thursday" id="thursday" />
                            <label htmlFor="thursday" value='R'>Thursday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="friday" id="friday" />
                            <label htmlFor="friday" value='F'>Friday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="saturday" id="saturday" />
                            <label htmlFor="saturday" value='S'>Saturday</label>
                        </div>
                        <div>
                            <input type="checkbox" className='selectedDays' name="sunday" id="sunday" />
                            <label htmlFor="sunday" value='S'>Sunday</label>
                        </div>
                    </div>
                  
                </div>
                }
                <button className="submitButton" onClick={() => setAddingCourse(true)}>Add Course</button>
            </div>
            
        </div>
    )
};