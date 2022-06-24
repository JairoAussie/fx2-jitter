import { useGlobalState } from '../utils/stateContext'
import Message from './Message'
import { useEffect, useState } from 'react'
import { getMessages, getMessagesByUser, getMyMessages } from '../services/messagesServices'
import { useLocation, useParams } from 'react-router-dom'

const Messages = () => {
    const {store, dispatch}= useGlobalState()
    const {messageList} = store
    const [error, setError] = useState(null)
    const location = useLocation()
    const params = useParams()
    useEffect(
      ()=>{
        if (location.pathname === "/messages/mymessages"){
          getMyMessages()
          .then(messages => {
            dispatch({
              type: "setMessageList",
              data: messages
            })
          })
          .catch(e=> {console.log(e)})
        } else if (params.username){
          getMessagesByUser(params.username)
          .then(messages => {
            if (messages.error){
              setError(`${params.username} doesn't exist`)
              dispatch({
                type: "setMessageList",
                data: []
              })
            } else{
              dispatch({
                type: "setMessageList",
                data: messages
              })
            }
            
          })
          .catch(e=> {console.log(e)})
        }
        
        else{
          getMessages()
          .then(messages => {
            dispatch({
              type: "setMessageList",
              data: messages
            })
          })
          .catch(e=> {console.log(e)})
        }
        
        //setMessageList(initialMessageList)
        
      }
      ,
      [location] //it will trigger everytime location changes, checking the if statement
    )
    
    return (
        <>
            {error && <p>{error}</p>}
            {messageList.map(message => 
                <Message key={message.id} message={message}/>
            )}
        </>
    )

}

export default Messages

