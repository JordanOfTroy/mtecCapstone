// import './mtecCapstone/client/src/App.css';
// import'../styles/main.css';
import '../styles/student.css';
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';


export default function StudentDash() {
    return (
<>
    <basePage class="container">
        <SideBar/>
        <div className="studentMain">
            <div className="studentDashboard">
                <Header title="Dashboard" />
            </div>
            <div className="studentTable">
                <table>
                    <tr>
                        <th>Course</th>
                        <th>Description</th>
                        <th>Time</th>
                        <th>Credit Hours</th>
                    </tr>
                    <tr>
                        <th>Rolling your own</th>
                        <th>"Description"</th>
                        <th>3 pm</th>
                        <th>3</th>
                    </tr>
                    <tr>
                        <th>Rolling your own</th>
                        <th>"Description"</th>
                        <th>3 pm</th>
                        <th>3</th>
                    </tr>
                    <tr>
                        <th>Rolling your own</th>
                        <th>"Description"</th>
                        <th>3 pm</th>
                        <th>3</th>
                    </tr>
                </table>
            </div>
            <div className="coursesButton">
                <button className="button glow-button">oh no</button>
            </div>
        </div>
    </basePage>
</>

    )
};
