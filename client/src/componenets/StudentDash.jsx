// import './mtecCapstone/client/src/App.css';
import'../styles/main.css';
import Header from './Header.jsx';

export default function StudentDash() {
    return (
<>
    <basePage class="container">
        <sideBar className="sideBar">
            <button className="button">Button 1</button>
            <button className="button">Button 2</button>
            <button className="button">Button 3</button>
            <button className="button">Button 4</button>
            <span></span>
            <span></span>
            <button className="button">Button 5</button>
        </sideBar>
        <div className="studentMain">
            <Header title="Dashboard" className="studentDashboard"/>
            <div className="courseTable">
                <table>
                    <tr>
                        <th>
                            <p>Course Title</p>
                        </th>
                        <th>
                            <p>Description</p>
                        </th>
                        <th>
                            <p>Time</p>
                        </th>
                        <th>
                            <p>Credit Hours</p>
                        </th>
                        
                    </tr>
                </table>
            </div>
        </div>
    </basePage>
</>

    )
};
