import'../styles/main.css';

export default function Header({title}) {
    return (
        <>            
        <div className="welcomeMessage">
            <h2>{title}</h2>
        </div>
        </>


    )
};