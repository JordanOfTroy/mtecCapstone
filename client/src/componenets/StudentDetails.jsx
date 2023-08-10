import { useEffect, useState } from "react"
import { useParams } from "react-router"
import SideBar from "./SideBar"
import Header from "./Header"


export default function StudentDetails () {
    const [userInfo, setUserInfo] = useState({})
    const [userCourses,setUserCourses] = useState([])
    const {studentId} = useParams()
    
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
                console.log(results)
                setUserInfo(results.user[0])
                setUserCourses(results.courses)
                console.log(userInfo)
                console.log(userCourses)
            } catch (err) {
                console.log('FETCHING ERROR:', err)
            }
    
        }
        initialApiCall()
    }, [studentId])

    return (
        <div className="container">
            <SideBar/>
            <div>
                <Header title='Student Details' />
                <div className="userInfo">
                    <h2>Student Info</h2>
                    <div className="userInfoBlock">
                        <label htmlFor="userName">Student Name:</label>
                        <p className='userInfo'id='userName'>{userInfo.first_name} {userInfo.last_name}</p>
                    </div>
                    <div className="userInfoBlock">
                        <label htmlFor="userId">Student ID:</label>
                        <p className='userInfo'id='userId'>{userInfo.id}</p>
                    </div>
                    <div className="userInfoBlock">
                        <label htmlFor="userEmail">Student Email:</label>
                        <p className='userInfo'id='userEmail'>{userInfo.email}</p>
                    </div>
                    <div className="userInfoBlock">
                        <label htmlFor="userTelephone">Student Phone:</label>
                        <p className='userInfo'id='userTelephone'>{userInfo.telephone}</p>
                    </div>
                    <div className="userInfoBlock">
                        <label htmlFor="userAddress">Student Address:</label>
                        <p className='userInfo'id='userAddress'>{userInfo.address}</p>
                    </div>
                </div>
                <div className="userCourses">
                    <h2>Student Courses</h2>
                    <div>
                        <ul>
                            {userCourses && userCourses.length > 0 ? (
                                    userCourses.map((course, i) => (
                                        <li key={i}>{course.title}</li>
                                    ))
                                ) : (
                                    <p>No courses found.</p>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="userCourses"></div>
            </div>
        </div>
    )
}