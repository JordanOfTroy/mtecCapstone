import'../styles/main.css';
import Base from './landing.jsx'


export default function Welcome({title}) {
    return (
        <>            
        <div className="welcomeMessage">
            <h2>{title}</h2>
        </div>
        </>


    )
};