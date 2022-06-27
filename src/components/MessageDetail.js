import { Link, useNavigate, useParams } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import { Button, Card, CardContent, Typography } from "@mui/material"
import { deleteMessage } from "../services/messagesServices"


const MessageDetail = () => {
    const {store, dispatch} = useGlobalState()
    const {messageList, loggedInUser} = store
    const params = useParams()
    const navigate = useNavigate()
    //console.log(params)

    const getMessage = (id) => {
        return messageList.find(m => m.id === parseInt(id))
    }
    const removeMessage = () => {
        console.log("params", params)
        console.log("message", message)

        deleteMessage(params.messageId)
        .then(() => {
            dispatch({
                type: "deleteMessage",
                data: params.id
            })
            navigate("/messages")
        })
    }
    const message = getMessage(params.messageId)//{text: "test message", user: "Test user"}
    return (
        <>
            { message ?
                <Card>
                    <CardContent>
                        <Typography variant='h5'>{message.text}</Typography>
                        <Typography variant='p'>{message.username}</Typography>
                        <Typography variant='p'>{message.posted}</Typography>
                    </CardContent> 
                    { loggedInUser === message.username && <Button onClick={removeMessage}>Delete message</Button>   }
                </Card>
                :
                <>
                    <p>Message not found</p>
                    <Link to="/messages">Go back to the main page</Link>
                </>
            }
            
        </>
    )

}

export default MessageDetail