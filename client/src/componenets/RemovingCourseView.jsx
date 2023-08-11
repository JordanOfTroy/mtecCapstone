export default function RemovingCourseView ({handleCancel}) {
    return (
        <>
            <h1>Removing Course</h1>
            <button className="button glow-button" onClick={() => handleCancel()}>Cancel</button>
        </>
    )
}