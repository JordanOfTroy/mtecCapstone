import { useNavigate } from "react-router"
import'../styles/studentDetails.scss';

export default function RemovingStudentView ({handleCancel, userInfo}) {
    const navTo = useNavigate()
    const {first_name, last_name, id} = userInfo

    const removeStudent = async () => {
        try {
            let rawResults = await fetch(`/api/user/${id}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
            })
            let parsedResults = await rawResults.json()
            console.log(parsedResults)
            if (rawResults.status == 200) {
                navTo('/admin')
            }
        } catch (err) {
            console.log('FETCHING ERROR:', err)
        }
    }

    return (
        <div className="removeStudentBG">
            <div className="removeAlert">
                <h1>Removing Student: {first_name} {last_name}</h1>
                <h2>Are you sure you want to remove {first_name} {last_name}? This will remove them from all courses they are currently enrolled in as well as deleting their student record. </h2>
                <h2>This action can not be undone.</h2>
            </div>
            <div className='removeStudent'>
                <button className="button glow-button" onClick={() => handleCancel()}>Cancel</button>
                <button className="button glow-button"  onClick={() => removeStudent()}>Remove {first_name} {last_name}</button>
            </div>
        </div>
    )
}