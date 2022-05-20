import Message from './Message'

const Messages = ({messageList}) => {
    return (
        <>
            {messageList.map(message => 
                <Message key={message.id} message={message}/>
            )}
        </>
    )

}

export default Messages

