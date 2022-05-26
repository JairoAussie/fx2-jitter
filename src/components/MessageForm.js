import { useState } from "react"
import { useNavigate } from "react-router-dom"

const MessageForm = ({loggedInUser, addMessage}) => {
    const navigate = useNavigate()
    const initialFormData = {
        text: ""
    }
    const [formData, setFormData] = useState(initialFormData)

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.text === ""){
            console.log("empty message")
        }else {
            console.log(formData)
            addMessage(formData.text)
            cleanMessage()
            navigate("/messages")
        }
        //adds the message to the list
        
    }

    const cleanMessage = () => {
        setFormData(initialFormData)
    }
    return (
        <>
            <p></p>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea type="text" name="text" id="text" placeholder={`What's on your mind ${loggedInUser}?`} value={formData.text} onChange={handleFormData}></textarea>
                </div>
                
                <input type="submit" value="post"/>
                <button onClick={cleanMessage}>Clean message</button>
            </form>
        </>
    )

}

export default MessageForm