import { Button, InputLabel, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"

const LoginForm = () => {
    const {dispatch} = useGlobalState()
    const navigate = useNavigate()
    
    const initialFormData = {
        user: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialFormData)

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("you clicked submit")
        console.log(formData)
        // activateUser(formData.user)
        dispatch({
            type: "setLoggedInUser",
            data: formData.user
          })
        setFormData(initialFormData)
        navigate("/messages")
    }

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel>Username:</InputLabel>
                    <TextField type="text" name="user" id="user" value={formData.user} onChange={handleFormData}/>
                </div>
                <div>
                    <InputLabel htmlFor="password">Password:</InputLabel>
                    <TextField type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/>
                </div>
               
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </>
    )

}

export default LoginForm