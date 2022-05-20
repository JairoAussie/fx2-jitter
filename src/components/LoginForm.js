import { useState } from "react"

const LoginForm = ({activateUser}) => {
    const initialFormData = {
        user: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialFormData)

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("you clicked submit")
        console.log(formData)
        activateUser(formData.user)
        setFormData(initialFormData)

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
                    <label>Username:</label>
                    <input type="text" name="user" id="user" value={formData.user} onChange={handleFormData}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/>
                </div>
                <input type="submit" value="Login"/>
            </form>
        </>
    )

}

export default LoginForm