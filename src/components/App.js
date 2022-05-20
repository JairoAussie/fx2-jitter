import React, {useEffect, useState}from 'react'
import LoginForm from './LoginForm'
import MessageForm from './MessageForm'
import Messages from './Messages'
import Navigation from './Navigation'
import initialMessageList from '../data/message-list.json'

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [messageList, setMessageList] = useState([])

  const activateUser = (username) => {
    setLoggedInUser(username)
  }

  const addMessage = (text) => {
    const message = {
      text: text,
      user: loggedInUser,
      id: messageList[messageList.length - 1 ].id + 1
    }
    setMessageList(
      (messageList) => [message, ...messageList]
    )
  }

  useEffect(
    ()=>{
      //fetch
      setMessageList(initialMessageList)
    }
    ,
    []
  )

  return (
    <div >
          <h1>Jitter</h1>
          <Navigation loggedInUser={loggedInUser} activateUser={activateUser}/>
          { !loggedInUser ?
            <LoginForm activateUser={activateUser}/>
            :
            <MessageForm loggedInUser={loggedInUser} addMessage={addMessage}/>
          }
          <Messages messageList={messageList}/>
    </div>
  )
}

export default App
