// import './mtecCapstone/client/src/App.css';
import'../styles/main.css';

export default function LeftBar() {
    return (
    <>
    <body>
        <basePage class="container">
            <sideBar className="sideBar">
                <button className="button">Button 1</button>
                <button className="button">Button 2</button>
                <button className="button">Button 2</button>
                <button className="button">Button 2</button>
                <span></span>
                <span></span>
                <button className="button">Button 2</button>
            </sideBar>
            <mainArea className="main"></mainArea>
        </basePage>
    </body>
    </>
    )
};
