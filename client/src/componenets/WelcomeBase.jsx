// import './mtecCapstone/client/src/App.css';
import'../styles/main.css';
import Welcome from './Welcome.jsx';

export default function WelcomeBase() {
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
        <mainArea className="main">
            <Welcome title="Welcome to Blah™"/>
        </mainArea>
    </basePage>
</>

    )
};
