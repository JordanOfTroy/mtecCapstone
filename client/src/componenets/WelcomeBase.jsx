// import './mtecCapstone/client/src/App.css';
import {Outlet, Link } from 'react-router-dom'
import'../styles/main.css';
import Welcome from './Welcome.jsx';
import Info from './Info.jsx';
import LargeInfo from './LargerInfo';
import SideBar from './SideBar.jsx';


export default function WelcomeBase() {

    

    return (
<>
    <div className="container">
        <SideBar/>
        <div className="main">
            <Welcome title="Welcome to Blah™"/>
            <Info special="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid incidunt alias adipisci debitis est, amet quas aut quasi, nostrum enim odio quibusdam saepe ad magni-™"/>
                {/* Note for Ashlyn : I'm wanting to try and fix the centering of the words in this box. 
                    And did we want drop shadows?
                */}

            <LargeInfo more="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, eligendi accusantium. Voluptatum minima sapiente sed, earum iure quam velit vero. Ipsum nostrum rem at minus, dignissimos architecto maiores perspiciatis vel!"/>
                {/* Do we make this a scrolly scroll box or no? */}
        </div>
        <div className='photo'>
            <img src='https://i.imgur.com/YBDH8YX.jpg' width='540' height='317'></img>
        </div>

    </div>
</> 

    )
};
