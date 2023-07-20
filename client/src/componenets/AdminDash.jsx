// import './mtecCapstone/client/src/App.css';
import'../styles/main.css';
import Header from './Header.jsx';
// import {Link} from 'react-router-dom';
import SideBar from './SideBar.jsx';

export default function AdminDash() {
    return (
<>
    <div class="container">
        <SideBar/>
        <Header title="Dashboard" className="studentDashboard"/>
        <div className="adminMain">

            <h3>Students</h3>
            <div className="courseTable">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Classes Taken</th>
                        </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>2 Many</td>
                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>2 Many</td>
                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>2 Many</td>
                    </tr>
                </table>
            </div>
            
            <h3>Courses</h3>
            <div className="courseTable">    
                <table>
                <tr>
                        <th>Course Title</th>
                        <th>Credit Hours</th>
                        <th>Amount of Students</th>
                        </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>Lotso</td>
                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>Lotso</td>
                    </tr>
                    <tr>
                        <td>Bartimus</td>
                        <td>Bartimus@bartybart.com</td>
                        <td>Lotso</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</>

    )
};
