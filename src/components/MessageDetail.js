import { Link, Navigate, useParams } from "react-router-dom"


const MessageDetail = ({messageList}) => {
    const params = useParams()
    console.log(params)

    const getMessage = (id) => {
        return messageList.find(m => m.id === parseInt(id))
    }

    const message = getMessage(params.messageId)//{text: "test message", user: "Test user"}
    return (
        <>
            { message ?
                <>
                    <h4>{message.text}</h4>
                    <p>{message.user}</p>
                </>
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