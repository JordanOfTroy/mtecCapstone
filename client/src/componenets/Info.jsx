import'../styles/main.css';

export default function Info(props) {
        let {special} = props
        return (
        <>            
        <div className="info">
            <h2>{special}</h2>
        </div>
        </>


    )
};