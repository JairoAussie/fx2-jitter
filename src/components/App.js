import React, {useEffect, useState}from 'react'
import LoginForm from './LoginForm'
import MessageForm from './MessageForm'
import Messages from './Messages'
import MessageDetail from './MessageDetail'
import Navigation from './Navigation'
import initialMessageList from '../data/message-list.json'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import About from './About'
import Notfound from './NotFound'

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
      id: messageList[0].id + 1 //nextId(messageList)
    }
    setMessageList(
      (messageList) => [message, ...messageList]
    )
  }
    // thanks Lance
  // function nextId(data) {
  //   // your code here
  //   //first exculde the empty data case. 
  //   if(data.length === 0) return 1;

  //   //second handle if data is not empty
  //   const sortData = data.sort((a,b) => a.id - b.id)
  //   const nextId = sortData[sortData.length - 1].id + 1 
  //   return nextId
  // }

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
          
          {/*{ !loggedInUser ?
            <LoginForm activateUser={activateUser}/>
            :
            <MessageForm loggedInUser={loggedInUser} addMessage={addMessage}/>
          }
        <Messages messageList={messageList}/> */}
        {/*Wrap all the components involved in the app's routing */}
        <Router>
          <Navigation loggedInUser={loggedInUser} activateUser={activateUser}/> {/*It is in the browser router because it uses the Link component*/}
          <Routes>
            <Route path="/" element={<Navigate to="messages" replace/>} />
            <Route path="messages">
              <Route index element={<Messages messageList={messageList}/>}/>
              <Route path="new" element={
                loggedInUser?
                  <MessageForm loggedInUser={loggedInUser} addMessage={addMessage}/>
                :
                  <Navigate to="/login" />
                } />
              <Route path=":messageId" element={<MessageDetail messageList={messageList}/>} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="login" element={<LoginForm activateUser={activateUser}/>} />
            <Route path="*" element={<Notfound />} /> {/* for everything else routes render notFound component*/}
          </Routes>
        </Router>
    </div>
  )
}

export default App
