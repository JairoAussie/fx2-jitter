const Message = ({message}) => {
    return (
        <>
            <h4>{message.text}</h4>
            <p>{message.user}</p>
        </>
    )

}

export default Message