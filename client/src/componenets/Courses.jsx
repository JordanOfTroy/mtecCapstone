import { useState, useEffect } from 'react';
import'../styles/courses.scss';
import {useNavigate} from 'react-router-dom';
import SideBar from './SideBar.jsx';
import Header from './Header.jsx';




export default function Courses() {

    const [allCourses, setAllCourses] = useState([])
    const [addingCourse, setAddingCourse] = useState(false)
    const [admins, setAdmins] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null)
    const navTo = useNavigate()

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
            parsedCourses.forEach(course => {
                course.isEditing = false
            })
            setAllCourses(parsedCourses)
            setAdmins(parsedAdmins)
        } catch (err) {
            console.log('Fetching Error:', err)
        }
    }
    useEffect(() => {
        apiCalls()
    }, [])

    const handleIsEditingRow = (courseId) => {
        let coursesCopy = [...allCourses]
        for (let i=0; i<coursesCopy.length; i++) {
            if (coursesCopy[i].id === courseId) {
                coursesCopy[i].isEditing = true
            }
        }
        setAllCourses(coursesCopy)
    }

    const handleRowInput = async (courseId) => {
        let title = document.getElementById('row_title').value
        let description = document.getElementById('row_description').value
        let course_code = document.getElementById('row_course_code').value
        let start_time = document.getElementById('row_start_time').value
        let end_time = document.getElementById('row_end_time'). value
        let credit_hours = document.getElementById('row_credit_hours').value
        let teacher_id = document.getElementById('row_teacher_id').value
        let capacity = document.getElementById('row_capacity').value
        let days_of_week = document.getElementById('row_days_of_week').value
        let room_number = document.getElementById('row_room_number').value

        try {
            let results = await fetch('/api/courses', {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    courseId, title, description, course_code, start_time, end_time, credit_hours, teacher_id, capacity, days_of_week, room_number
                })
            })

            if (results.status == 200) {
                apiCalls()
               
            } else {
                console.log(results.status)
            }

        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }
    }

    const handleJoinCourses = async () => {
        let selectedOptions = document.getElementsByClassName('selectedCourse')
        let selectedCourses = []
        for (let option in selectedOptions) {
            if (selectedOptions[option].checked) {
                selectedCourses.push(selectedOptions[option].value)
            }
        }

        try {
            let rawJoinResults = await fetch('/api/joinCourse', {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({selectedCourses})
            })

            let parsedResults = await rawJoinResults.json()

            if (rawJoinResults.status == 200) {
                console.log(parsedResults)
                navTo('/student')
            } else {
                // console.log('does anything happen before')
                conflictMessage();
                // console.log('status: ',rawJoinResults.status)
                // console.log('Message: ',parsedResults.message)
                // console.log('Course:', parsedResults.courseId)
                //do something to tell user they can't sign up
                //or make the options unavailable if they are already enrolled??
            }

        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }
    }

    const cancelRowEdit = (courseId) => {
        let courses = [...allCourses]
        for (let i = 0; i < courses.length; i++){
            if (courses[i].id === courseId) {
                courses[i].isEditing = false
            }
        }
        setAllCourses(courses)
    }

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
                console.log(parsedResults)
                setAllCourses(parsedResults)
            }
        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }
    }

    const adminOptions = admins.map((admin, i) => {
        return <option key={i} value={admin.id}>{admin.first_name} {admin.last_name}</option>
    })

    let courses
    if (allCourses && allCourses.length > 0) {
        courses = allCourses.map((course, i) => {
            return (
                <>
                {
                    !course.isEditing
                    ?
                    
                    <tr key={i}>
                        <td>{course.title}</td>
                        <td>
                            {/* <button className='viewButton' onClick={() => getCourseDescription()}>View</button> */}
                            <div className="courseInfo" onClick={() => getCourseDescription(`coursePopup${i}`)}>
                                <button className="viewButton">View</button>
                                <span className="popupText" id={`coursePopup${i}`}>
                                    <p>{`${course.description}`}</p>
                                    <button>Okay</button>
                                </span>
                            </div>
                            </td>
                        <td>{course.course_code}</td>
                        <td>{`${course.start_time} - ${course.end_time}`}</td>
                        <td>{course.credit_hours}</td>
                        <td>{`${course.first_name} ${course.last_name}`}</td>
                        <td>{course.capacity}</td>
                        <td>{course.days_of_week}</td>
                        <td>{course.room_number}</td>
                        <td>{
                            window.localStorage.getItem('isAdmin') === 'true'
                            ?
                            <div>
                                <button onClick={() => handleIsEditingRow(course.id)}>Edit</button>
                                <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                            </div>
                                :
                            <input type='checkbox' className='selectedCourse' value={course.id}></input>
                            }</td>
                    </tr>
                    :
                    <tr key={i}>
                        <td><input type='text' defaultValue={course.title} id='row_title'></input></td>
                        <td><input type='text' defaultValue={course.description} id='row_description'></input></td>
                        <td><input type='text' defaultValue={course.course_code} id='row_course_code'></input></td>
                        <td>
                            <input type='time' defaultValue={course.start_time} id='row_start_time'></input>
                            <input type='time' defaultValue={course.end_time} id='row_end_time'></input>
                        </td>
                        <td><input type="number" defaultValue={course.credit_hours} id='row_credit_hours'/></td>
                        <td>
                           <select name="" id="row_teacher_id">
                            {
                                admins.map((admin, i) => {
                                    if (admin.id === course.teacher_id) {
                                        return <option key={i} value={admin.id} selected='selected'>{admin.first_name} {admin.last_name}</option>
                                    } else {
                                        return <option key={i} value={admin.id}>{admin.first_name} {admin.last_name}</option>
                                    }

                                })
                            }
                           </select>
                        </td>
                        <td><input type="number" defaultValue={course.capacity} id="row_capacity" /></td>
                        <td><input type="text" defaultValue={course.days_of_week} id="row_days_of_week" /></td>
                        <td><input type="text" defaultValue={course.room_number} id="row_room_number" /></td>
                        <td>{
                            window.localStorage.getItem('isAdmin') === 'true'
                            ?
                            <div>
                                <button onClick={() => handleRowInput(course.id)}>Submit</button>
                                <button onClick={() => cancelRowEdit(course.id)}>Cancel</button>
                            </div>
                                :
                            <input type='checkbox' className='selectedCourse' value={course.id}></input>
                            }</td>
                    </tr>
                    
                }
                </>
            )
            function getCourseDescription(eleId) {
                var popup = document.getElementById(eleId);
                popup.classList.toggle("show");
                // console.log(course.description)
        
            }
        })
    
    }

   

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

    const handleUserSearch = async (e) => {
        const term = e.target.value;

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const newTimeout = setTimeout(async () => {
            try {
                let rawResults = await fetch('/api/searchCourses', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ term })
                });
                let parsedResults = await rawResults.json();
                console.log(parsedResults);
                setAllCourses(parsedResults)
            } catch (err) {
                console.log('FETCHING ERROR:', err);
            }
        }, 300); 

        setSearchTimeout(newTimeout);
    };
    function conflictMessage() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
      }
      

    return (
        <div className="container">
            <SideBar/>
            <div className="coursesMain">
            
                <div className="coursesDashboard">
                    <Header title="Course Wizard"/>
                </div>
                {!addingCourse
                ?
                <>
                    <div className="searchBar">
                        <input className="search" placeholder='search by course title' onKeyUp={(e) => handleUserSearch(e)}></input>
                    </div>
                    <div className="courseTable">
                        <table>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Course Code</th>
                                <th>Time</th>
                                <th>Credit Hours</th>
                                <th>Teacher</th>
                                <th>Capacity</th>
                                <th>Days</th>
                                <th>RoomNumber</th>
                                {window.localStorage.getItem('isAdmin') === 'true'
                                    ?
                                    <th>
                                        Edit Course
                                    </th> :
                                    <th>
                                        Enroll
                                    </th>
                                }
                            </tr>
                            {allCourses && allCourses.length>0 ? courses : <p>No courses</p>}
                            
                        </table>
                        
                    </div>
                    {
                    window.localStorage.getItem('isAdmin') === 'true'
                    ?
                    <button className="addButton" onClick={() => setAddingCourse(true)}>Add Course</button>
                    :
                    <button className="addButton" onClick={() => handleJoinCourses()}>Join Courses</button>
                    }
                </>
                :
                <div className="createCourse">
                    <div className="creation">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" placeholder='Title' />
                    </div>
                    <div className="creation">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" id="description" placeholder="Description" />
                    </div>
                    <div className="creation">
                        <label htmlFor="course_code">Course Code</label>
                        <input type="text" name="course_code" id="course_code" placeholder="Course Code" />
                    </div>
                    <div className="creation">
                        <label htmlFor="credit_hours">Credit Hours</label>
                        <input type="number" name="credit_hours" id="credit_hours" placeholder="Credit Hours"/>
                    </div>
                    <div className="creation">
                        <label htmlFor="tuition">Tuition</label>
                        <input type="number" name="tuition" id="tuition" placeholder="Tuition"/>
                    </div>
                    <div className="creation">
                        <label htmlFor="capacity">Max Capacity</label>
                        <input type="number" name="capacity" id="capacity" placeholder="Max Capacity" />
                    </div>
                    <div className="creation">
                        <label htmlFor="room_number">Room Number</label>
                        <input type="text" name="room_number" id="room_number" placeholder="Room Number"/>
                    </div>
                    <div className="creation">
                        <label htmlFor="teacher_id">Instructor</label>
                        <select type="text" name="teacher_id" id="teacher_id" >
                            <option unselectable='Please select an instructor'>Please select an instructor</option>
                            {adminOptions}
                        </select>
                    </div>
                    
                    <div className="creation">
                        <label htmlFor="start_time">Start Time</label>
                        <input type="time" name="start_time" id="start_time" min='00:00' max='24:00'/>
                    </div>
                    <div className="creation">
                        <label htmlFor="end_time">End Time</label>
                        <input type="time" name="end_time" id="end_time" min='00:00' max='24:00'/>
                    </div>
                    <div className="daySelection1">
                        {/* <p htmlFor="course">Days</p> */}
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
                    </div>
                    <div className="daySelection">
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
                        
                    </div>
                    <div className="daySelection">
                        <div className="sunday">
                            <input type="checkbox" className='selectedDays' name="sunday" id="sunday" value='S'/>
                            <label htmlFor="sunday" >Sunday</label>
                        </div>
                    </div>
                    <div className="createCourseButtons">
                        <button className='submitButton'onClick={() => setAddingCourse(false)}>Cancel</button>
                        <button className='submitButton' onClick={() => handleCourseSubmission()}>Submit</button>
                    </div>
                </div>
                }
                <div className="popup" onClick={() => conflictMessage()}>
                    <span class="popupText" id="myPopup">
                        <p>It appears you have one or more scheduling conflicts, please double check your currently enrolled courses, or select a different course to enroll in.</p>
                        <button>Okay</button>
                    </span>
                    
                </div>
            </div>
            
            
        </div>
    )
};