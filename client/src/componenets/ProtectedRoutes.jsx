import {Navigate, useNavigate} from 'react-router-dom'


export default function ProtectedRoutes ({children, user}) {
    const navTo = useNavigate()
    if (!user) {
        // navTo('/', {state: {message: 'You must be logged in to access that page'}})

        return <Navigate to='/'/>
    }
    else return children
}
