import'../styles/main.css';

export default function Info(props) {
        let {special} = props
        return (
        <>            
        <div className="info">
            <p>{special}</p>
        </div>
        </>


    )
};