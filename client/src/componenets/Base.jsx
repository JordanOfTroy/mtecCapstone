// import './mtecCapstone/client/src/App.css';
import'../styles/main.css';
import Header from './Header.jsx';

export default function Base() {
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
            <Header title="Dashboard"/>
        </mainArea>
    </basePage>
</>

    )
};