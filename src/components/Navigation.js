import { Link, useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"

const Navigation = () => {
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    
    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault()
        dispatch({
            type: "setLoggedInUser",
            data: "" 
          })
        navigate("/messages")
    }
    
    return (
        <nav>
            <Link to="/messages">Home</Link>
            <Link to="/about">About</Link>
            { loggedInUser ?
                <>
                    <Link to="/messages/new">New message</Link>
                    {loggedInUser}
                    <Link to="/messages" onClick={logout}>Logout</Link>
                </>
               :
               <>
                    Guest
                    <Link to="/login">Login</Link>
                    <Link to="/login">Sign Up</Link>
               </>
                
            }
           
            

            
        </nav>
    )

}

export default Navigation