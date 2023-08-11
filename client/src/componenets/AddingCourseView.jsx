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
            } catch (err) {
                console.log('FETCHING ERROR:', err)
            }
        }
        getAvailableCourses()
    }, [id])

    return (
        <>
            <h1>Adding Course</h1>
            <button className="button glow-button" onClick={() => handleCancel()}>Cancel</button>
        </>
    )
}