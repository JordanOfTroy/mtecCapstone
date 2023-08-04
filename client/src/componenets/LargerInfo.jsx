import'../styles/main.css';

export default function LargeInfo(props) {
    let {more} = props;
    return (
        <>            
        <div className="largerInfo">
            <p>{more}</p>
        </div>
        </>


    )
};