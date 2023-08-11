import { useEffect, useState } from "react"
import { useParams } from "react-router"
import SideBar from "./SideBar"
import Header from "./Header"
import RemovingStudentView from "./RemovingStudentView"
import UpdatingStudentView from "./UpdatingStudentView"
import AddingCourseView from "./AddingCourseView"
import RemovingCourseView from "./RemovingCourseView"

export default function StudentDetails () {
    const [userInfo, setUserInfo] = useState({})
    const [userCourses,setUserCourses] = useState([])
    const {studentId} = useParams()
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [isRemovingStudent, setIsRemovingStudent] = useState(false)
    const [isUpdatingStudent, setIsUpdatingStudent] = useState(false)
    const [isAddingCourse, setIsAddingCourse] = useState(false)
    const [isRemovingCourse, setIsRemovingCourse] = useState(false)
    const allOff = !isButtonClicked && !isRemovingStudent && !isUpdatingStudent && !isAddingCourse && !isRemovingCourse

    useEffect(() => {
        const initialApiCall = async () => {
            console.log(studentId)
            try {
                let rawResults = await fetch(`/api/student/${studentId}`, {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`
                    }
                    
                })
                let results = await rawResults.json()
                console.log(results.user)
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
        setIsButtonClicked(!isButtonClicked)
        setIsRemovingStudent(!isRemovingStudent)
    }

    const handleUpdateStudent = () => {
        console.log('updating student')
        setIsButtonClicked(!isButtonClicked)
        setIsUpdatingStudent(!isUpdatingStudent)
    }
    
    const handleAddNewCourse = () => {
        console.log('adding course')
        setIsButtonClicked(!isButtonClicked)
        setIsAddingCourse(!isAddingCourse)
    }
    
    const handleRemoveCourse = () => {
        console.log('removing course')
        setIsButtonClicked(!isButtonClicked)
        setIsRemovingCourse(!isRemovingCourse)
    }

    const handleCancel = () => {
        setIsButtonClicked(false);
        setIsRemovingStudent(false);
        setIsUpdatingStudent(false);
        setIsAddingCourse(false);
        setIsRemovingCourse(false);
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
    
    
    let datHTML = () => {
        if (allOff) {
            return initialView
        } else if (isButtonClicked && isRemovingStudent) {
            return <RemovingStudentView
                    handleCancel={handleCancel}
                    userInfo = {userInfo}
                    />
        } else if (isButtonClicked && isUpdatingStudent) {
            return <UpdatingStudentView
                    handleCancel={handleCancel}
                    userInfo = {userInfo}
                    />
        } else if (isButtonClicked && isAddingCourse) {
            return <AddingCourseView
                    handleCancel={handleCancel}
                    userInfo = {userInfo}
                    />
        } else if (isButtonClicked && isRemovingCourse) {
            return <RemovingCourseView
                    handleCancel={handleCancel}
                    userInfo = {userInfo}
                    />
        }
    }

    return (
        <div className="container">
            <SideBar/>
            <div>
                <Header title='Student Details' />
                {datHTML()}
            </div>
        </div>
    )
}