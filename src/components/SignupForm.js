import { Button, InputLabel, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signUp } from "../services/authServices"
import { useGlobalState } from "../utils/stateContext"

const SignupForm = () => {
    const {dispatch} = useGlobalState()
    const navigate = useNavigate()
    
    const initialFormData = {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    }
    const [formData, setFormData] = useState(initialFormData)

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        signUp(formData)
          .then(({username, jwt}) => {
            sessionStorage.setItem("username",  username)
            sessionStorage.setItem("token", jwt)
            dispatch({
                type: "setLoggedInUser",
                data: username
            })
            dispatch({
                type: "setToken",
                data: jwt
            })
        })
        .catch(e => {console.log(e)})
        
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
            <Typography variant='h4'>Register user</Typography>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel>Username:</InputLabel>
                    <TextField type="text" name="username" id="username" value={formData.username} onChange={handleFormData}/>
                </div>
                <div>
                    <InputLabel>Email:</InputLabel>
                    <TextField type="text" name="email" id="email" value={formData.email} onChange={handleFormData}/>
                </div>
                <div>
                    <InputLabel htmlFor="password">Password:</InputLabel>
                    <TextField type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/>
                </div>
                <div>
                    <InputLabel htmlFor="password">Password confirmation:</InputLabel>
                    <TextField type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData}/>
                </div>
               
                <Button variant="contained" type="submit">Sign up</Button>
            </form>
        </>
    )

}

export default SignupForm