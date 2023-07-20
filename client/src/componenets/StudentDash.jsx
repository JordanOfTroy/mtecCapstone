// import './mtecCapstone/client/src/App.css';
import'../styles/main.css';
import Header from './Header.jsx';

export default function StudentDash() {
    return (
<>
    <basePage class="container">
        <sideBar className="sideBar">
            <button className="button glow-button">Button 1</button>
            <button className="button glow-button">Button 2</button>
            <button className="button glow-button">Button 3</button>
            <button className="button glow-button">Button 4</button>
            <span></span>
            <span></span>
            <button className="button glow-button">Button 5</button>
        </sideBar>
        <div className="studentMain">
            <Header title="Dashboard" className="studentDashboard"/>
            <div className="courseTable">
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
        </div>
    </basePage>
</>

    )
};
