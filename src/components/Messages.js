import { useGlobalState } from '../utils/stateContext'
import Message from './Message'

const Messages = () => {
    const {store}= useGlobalState()
    const {messageList} = store
    
    return (
        <>
            {messageList.map(message => 
                <Message key={message.id} message={message}/>
            )}
        </>
    )

}

export default Messages

