export default function RemovingStudentView ({handleCancel}) {
    return (
        <>
            <h1>Removing Student</h1>
            <button className="button glow-button" onClick={() => handleCancel()}>Cancel</button>
        </>
    )
}