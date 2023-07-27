import'../styles/courses.scss';
import {Link} from 'react-router-dom';
import SideBar from './SideBar.jsx';
import Header from './Header.jsx';


export default function AddCourses() {
    return (
        <div className="container">
            <SideBar/>
            <div className="coursesMain">
                <div className="coursesDashboard">
                    <Header title="Course Wizard"/>
                </div>
                <div className="searchBar">
                    <input placeholder='search by course title'></input>
                </div>
                <div className="courseTable">
                    <table>
                        <tr>
                            <th>Course</th>
                            <th>Description</th>
                            <th>Time</th>
                            <th>Credit Hours</th>
                            <th>Teacher</th>
                        </tr>
                        <tr>
                            <td>Hunting Monsters</td>
                            <td className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt voluptatem mollitia placeat necessitatibus facilis sit fuga maxime eius quis esse nostrum alias vel consectetur, facere temporibus tempore aperiam dolores similique.</td>
                            <td>3 pm</td>
                            <td>3</td>
                            <td>Henry C</td>
                        </tr>
                        
                    </table>
                </div>
            </div>
        </div>
    )
};