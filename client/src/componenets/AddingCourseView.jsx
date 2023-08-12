import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export default function AddingCourseView ({handleCancel, userInfo}) {
    const navTo = useNavigate()
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
                setAvailableCourse(parsedCourses)
            } catch (err) {
                console.log('FETCHING ERROR:', err)
            }
        }
        getAvailableCourses()
    }, [])

    const courseOptions = () => {
        return (
            availableCourses.map((course, i) => {
                const {title, course_code, description, id} = course
                return (
                    <tr key={i}>
                        <td>{title}</td>
                        <td>{course_code}</td>
                        <td>{description}</td>
                        <td><input type="checkbox" className="courseOption" value={id}/></td>
                    </tr>
                )
            })
        )
    }


    const handleAddNewCourses = async () => {
        const courseOptions = document.getElementsByClassName('courseOption');
        const selectedCourses = [];
    
        for (let i = 0; i < courseOptions.length; i++) {
            if (courseOptions[i].checked) {
                selectedCourses.push(courseOptions[i].value);
            }
        }
    
        try {
            let rawResponse = await fetch('/api/joinCourse', {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({ selectedCourses, id })
            });
            
            if(rawResponse.status == 200) {
                let parsedResponse = await rawResponse.json()
                // console.log(parsedResponse)
                navTo('/admin')
            }
        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }
    }

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
                <button className="button glow-button" onClick={() => handleAddNewCourses()}>Add new courses</button>
            </div>
        </>
    )
}