import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"

const MessageForm = () => {
    const {store, dispatch} = useGlobalState()
    const {loggedInUser, messageList} = store
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
    
      const addMessage = (text) => {
        const message = {
          id: messageList[0].id + 1, //nextId(messageList)
          text: text,
          user: loggedInUser,
          
        }
        // setMessageList(
        //   (messageList) => [message, ...messageList]
        // )
        dispatch({
          type: "addMessage",
          data: message
        })
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