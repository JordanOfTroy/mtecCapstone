import { useState, useEffect } from 'react';
import'../styles/courses.scss';
import {Link} from 'react-router-dom';
import SideBar from './SideBar.jsx';
import Header from './Header.jsx';




export default function Courses() {

    const [allCourses, setAllCourses] = useState([])

    useEffect(() => {
        let apiCalls = async () => {
            try {
                const rawCourses = await fetch('/api/courses', {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                    }
                })
                const parsedCourses = await rawCourses.json()
                console.log(parsedCourses)
                setAllCourses(parsedCourses)
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
                </tr>
            )
        })
    
    }


    return (
        <div className="container">
            <SideBar/>
            <div className="coursesMain">
                <div className="coursesDashboard">
                    <Header title="Course Wizard"/>
                </div>
                <div className="searchBar">
                    <input className="search" placeholder='search by course title'></input>
                </div>
                <div className="courseTable">
                    <table>
                        <tr>
                            <th>Course</th>
                            <th>Description</th>
                            <th>Course Code</th>
                            <th>Time</th>
                            <th>Teacher</th>
                        </tr>
                        {allCourses.length>0 ? courses : <tr></tr>}
                        
                    </table>
                </div>
            </div>
        </div>
    )
};