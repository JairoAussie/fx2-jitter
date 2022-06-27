import { useGlobalState } from '../utils/stateContext'
import Message from './Message'

const Messages = () => {
    const {store}= useGlobalState()
    const {messageList} = store
    
    
    return (
        <>
          {messageList.length ?
            <>
              {messageList.map(message => 
                <Message key={message.id} message={message}/>
              )} 
            </> 
            :
            <p>List of messages is empty</p>
          
          } 
            
        </>
    )

}

export default Messages



