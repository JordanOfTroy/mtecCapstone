import'../styles/main.css';

export default function LargeInfo(props) {
    let {more} = props;
    return (
        <>            
        <div className="largerInfo">
            <h2>{more}</h2>
        </div>
        </>


    )
};