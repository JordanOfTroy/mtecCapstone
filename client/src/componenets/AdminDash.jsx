// import './mtecCapstone/client/src/App.css';
import'../styles/main.css';
import Header from './Header.jsx';

export default function AdminDash() {
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
        <Header title="Dashboard" className="studentDashboard"/>
        <div className="adminMain">

            <h3>Students</h3>
            <div className="courseTable">
                <table>
                    <tr>

                    </tr>
                </table>
            </div>
            
            <h3>Courses</h3>
            <div className="courseTable">    
                <table>
                    <tr>

                    </tr>
                </table>
            </div>
        </div>
    </basePage>
</>

    )
};
