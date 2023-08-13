import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export default function RemovingCourseView ({handleCancel, userInfo}) {
    const navTo = useNavigate()
    const {id} = userInfo
    const [enrolledCourses, setEnrolledCourses] = useState([])

    useEffect(() => {
        let getStudentCourses = async () => {
            try {
                let rawCourses = await fetch(`/api/myCourses/${id}`,{
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`
                    }
                })
                if (rawCourses.status == 200) {
                    let parsedCourses = await rawCourses.json()
                    console.log(parsedCourses)
                    setEnrolledCourses(parsedCourses)
                }
            } catch (err) {
                console.log('FETCHING ERR:', err)
            }
        }
        getStudentCourses()
    }, [])

    const handleRemoveSelectedCourses = async () => {
        const removedCourses = []
        const courseOptions = document.getElementsByClassName('courseOption')
        for (let i=0; i < courseOptions.length; i++) {
            if (courseOptions[i].checked) {
                removedCourses.push(courseOptions[i].value)
            }
        }
        try {
            let rawResults = await fetch('/api/dropCourse', {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    Authorization : `Bearer ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({removedCourses, id})
            })
            if (rawResults.status == 200) {
                let parsedResults = await rawResults.json()
                // console.log(parsedResults)
                navTo('/admin')
            }
        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }
    }

    const courseOptions = () => {
        return (
            enrolledCourses.map((course, i) => {
                const {id, title, course_code, description} = course
                return (
                    <tr key={i}>
                        <td>{title}</td>
                        <td>{course_code}</td>
                        <td className="detailDescription">{description}</td>
                        <td><input type="checkbox" className="courseOption" value={id} /></td>
                    </tr>
                )
            })
        )
    }

    return (
        <>
            <h1>Removing Course</h1>
            <div className="detailTable">
                <table>
                    <tr>
                        <td>Title</td>
                        <td>Course Code</td>
                        <td>Description</td>
                        <td>Remove</td>
                    </tr>
                    {enrolledCourses && enrolledCourses.length > 0 ? courseOptions() : <p>No course options</p>}
                </table>
            </div>
            <div className="adminRemoveCourse">
                <button className="button glow-button" onClick={() => handleCancel()}>Cancel</button>
                <button className="button glow-button" onClick={() => handleRemoveSelectedCourses()}>Remove selected courses</button>
            </div>
        </>
    )
}