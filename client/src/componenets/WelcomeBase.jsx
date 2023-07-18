// import './mtecCapstone/client/src/App.css';
import'../styles/main.css';
import Welcome from './Welcome.jsx';
import Info from './Info.jsx';
import LargeInfo from './LargerInfo';

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
            <Info special="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid incidunt alias adipisci debitis est, amet quas aut quasi, nostrum enim odio quibusdam saepe ad magni-"/>
            <LargeInfo more="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, eligendi accusantium. Voluptatum minima sapiente sed, earum iure quam velit vero. Ipsum nostrum rem at minus, dignissimos architecto maiores perspiciatis vel!"/>
        </mainArea>
    </basePage>
</> 

    )
};
