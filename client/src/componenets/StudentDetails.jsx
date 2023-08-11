import { useEffect, useState } from "react"
import { useParams } from "react-router"
import SideBar from "./SideBar"
import Header from "./Header"


export default function StudentDetails () {
    const [userInfo, setUserInfo] = useState({})
    const [userCourses,setUserCourses] = useState([])
    const {studentId} = useParams()
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [isRemovingStudent, setIsRemovingStudent] = useState(false)
    const [isUpdatingStudent, setIsUpdatingStudent] = useState(false)
    const [isAddingCourse, setIsAddingCourse] = useState(false)
    const [isRemovingCourse, setIsRemovingCourse] = useState(false)
    
    useEffect(() => {
        const initialApiCall = async () => {
            try {
                let rawResults = await fetch(`/api/student/${studentId}`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`
                    }
                    
                })
                let results = await rawResults.json()
                // console.log(results)
                setUserInfo(results.user[0])
                setUserCourses(results.courses)
            } catch (err) {
                console.log('FETCHING ERROR:', err)
            }
    
        }
        initialApiCall()
    }, [studentId])

    const handleRemoveStudent = () => {
        console.log('removing student')
    }

    const handleUpdateStudent = () => {
        console.log('updating student')
    }
    
    const handleAddNewCourse = () => {
        console.log('adding course')
    }
    
    const handleRemoveCourse = () => {
        console.log('removing course')
    }



    const initialView = (
        <>
        <div className="userInfo">
                    <h2>Student Info</h2>
                    <ul>
                        <li>Name: {userInfo.first_name} {userInfo.last_name}</li>
                        <li>ID: {userInfo.id}</li>
                        <li>Email: {userInfo.email}</li>
                        <li>Phone: {userInfo.telephone}</li>
                        <li>Address: {userInfo.address}</li>
                    </ul>
                </div>
                <div className="userCourses">
                    <h2>Student Courses</h2>
                    <div>
                        <table>
                            <tr>
                                <th>Title</th>
                                <th>Course Code</th>
                                <th>Description</th>
                            </tr>
                            {userCourses && userCourses.length > 0 ? (
                                    userCourses.map((course, i) => (
                                        <tr key={i}>
                                            <td >{course.title}</td>
                                            <td>{course.course_code}</td>
                                            <td>{course.description}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <p>No courses found.</p>
                                )
                            }
                        </table>
                    </div>
                </div>
                <div className="buttonsOfPower">
                    <button className="button glow-button" onClick={() => handleRemoveStudent()}>Remove student</button>
                    <button className="button glow-button" onClick={() => handleUpdateStudent()}>Update student</button>
                    <button className="button glow-button" onClick={() => handleAddNewCourse()}>Add new course</button>
                    <button className="button glow-button" onClick={() => handleRemoveCourse()}>Remove course</button>
                </div>
        </>
    )
    const allOff = !isButtonClicked && !isRemovingStudent && !isUpdatingStudent && !isAddingCourse && !isRemovingCourse
    return (
        <div className="container">
            <SideBar/>
            <div>
                <Header title='Student Details' />
                {
                    allOff ? initialView : <p>fuck off</p>
                }
                {/* {initialView} */}
                
            </div>
        </div>
    )
}