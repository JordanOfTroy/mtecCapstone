export default function UpdatingStudentView ({handleCancel}) {
    return (
        <>
            <h1>Updating Student</h1>
            <button className="button glow-button" onClick={() => handleCancel()}>Cancel</button>
        </>
    )
}