import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export default function AddingCourseView ({handleCancel, userInfo}) {
    const {id} = userInfo
    const [availableCourses, setAvailableCourse] = useState([])

    useEffect(() => {
        const getAvailableCourses = async () => {
            try {
                let rawCourses = await fetch(`/api/availableCourses/${id}`,{
                    method: 'GET',
                    headers: {
                        "content-type": "application/json"
                    }
                })
                let parsedCourses = await rawCourses.json()
                console.log(parsedCourses)
                setAvailableCourse(parsedCourses)
                console.log('from useEffect:', availableCourses)
            } catch (err) {
                console.log('FETCHING ERROR:', err)
            }
        }
        getAvailableCourses()
    }, [])

    const courseOptions = () => {
        console.log(availableCourses)
        return (
            availableCourses.map((course, i) => {
                const {title, course_code, description} = course
                return (
                    <tr key={i}>
                        <td>{title}</td>
                        <td>{course_code}</td>
                        <td>{description}</td>
                        <td><input type="checkbox" className="courseOption" /></td>
                    </tr>
                )
            })
        )
    }
    console.log('before Return:', availableCourses)
    return (
        <>
            <h1>Adding Course</h1>
            <div>
                <table>
                    <tr>
                        <td>Title</td>
                        <td>Course Code</td>
                        <td>Description</td>
                        <td>Enroll</td>
                    </tr>
                    {availableCourses && availableCourses.length > 0 ? courseOptions() : <p>No course options</p>}
                </table>
            </div>
            <div>
                <button className="button glow-button" onClick={() => handleCancel()}>Cancel</button>
                <button>Add new courses</button>
            </div>
        </>
    )
}