import'../styles/main.css';

export default function Header(props) {
    let {title} = props;
    return (
        <>            
        <div className="header">
            <h2>{title}</h2>
        </div>
        </>


    )
};