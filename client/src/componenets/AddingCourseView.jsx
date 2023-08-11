export default function AddingCourseView ({handleCancel}) {
    return (
        <>
            <h1>Adding Course</h1>
            <button className="button glow-button" onClick={() => handleCancel()}>Cancel</button>
        </>
    )
}