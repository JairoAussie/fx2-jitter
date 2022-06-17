import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"

const Navigation = () => {
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    
    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault()
        sessionStorage.clear()
        //sessionStorage.removeItem("username")
        dispatch({
            type: "setLoggedInUser",
            data: null 
        })
        dispatch({
            type: "setToken",
            data: null 
        })
        navigate("/messages")
    }
    
    return (
        <AppBar position="sticky">
            <Typography variant='h3'>Jitter</Typography>
            <Toolbar>
                <Tabs value={false}>
                    <Tab label="Home" value="/messages" component={Link} to="/messages" />
                    <Tab label="About" component={Link} to="/about" />
                    { loggedInUser && <Tab label="New message" component={Link} to="/messages/new" />}
                    { loggedInUser && <Tab label="Logout" onClick={logout} component={Link} to="/messages" />}
                    { !loggedInUser && <Tab label="Login" component={Link} to="/login" />}
                    { !loggedInUser && <Tab label="Signup" component={Link} to="/signup" />}
                </Tabs>
                
            </Toolbar>

        </AppBar>
                       
    )

}

export default Navigation