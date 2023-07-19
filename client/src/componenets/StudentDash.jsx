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
                            <span/>
                            <td>This is a course what if i continue to type mother fucker</td>
                            <span/>
                            <td>this is another example</td>

                        </th>
                        <span/>
                        <th>
                            <p>Description</p>
                            <span/>
                            <td>This is a description</td>
                        </th>
                        <span/>
                        <th>
                            <p>Time</p>
                            <span/>
                            <td>When it's held</td>
                        </th>
                        <span/>
                        <th>
                            <p>Credit Hours</p>
                            <span/>
                            <td>Eleventy-Billion</td>
                        </th>
                        
                    </tr>
                </table>
            </div>
        </div>
    </basePage>
</>

    )
};
