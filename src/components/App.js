import React, {useEffect, useReducer}from 'react'
import LoginForm from './LoginForm'
import MessageForm from './MessageForm'
import Messages from './Messages'
import MessageDetail from './MessageDetail'
import Navigation from './Navigation'
//import initialMessageList from '../data/message-list.json'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import About from './About'
import Notfound from './NotFound'
import { reducer } from '../utils/reducer'
import { StateContext } from '../utils/stateContext'
import { getMessages } from '../services/messagesServices'
import SignupForm from './SignupForm'
//import axios from 'axios'

const App = () => {
  //useReducer handles all the states in the same object
  const initialState = {
    messageList: [],
    loggedInUser: sessionStorage.getItem("username") || null,
    token: sessionStorage.getItem("token") || null
  }
  //useReducer receives two arguments
  //reducer -> It is the function that is executed when...
  //state
  // it returns an array with two elements
  // store -> actually that's the name for the state
  // dispatch -> Is the function that triggers the reducer function, dispatch's argument is action
  const [store, dispatch] = useReducer(reducer, initialState)
  const {loggedInUser} = store

  useEffect(
    ()=>{
      // fetch("http://localhost:4000/messages")
      // .then(response => response.json())
      // .then(data=> console.log(data))
      // axios.get("http://localhost:4000/messages")
      // .then(response => {
      //   console.log(response.data)
      //   dispatch({
      //     type: "setMessageList",
      //     data: response.data
      //   })
      // })
      getMessages()
        .then(messages => {
          dispatch({
            type: "setMessageList",
            data: messages
          })
        })
        .catch(e=> {console.log(e)})
      //setMessageList(initialMessageList)
      
    }
    ,
    []
  )

  return (
    <div >

        {/*Wrap all the components that use global states like loggedInUser and messageList in the state context provider*/}
        <StateContext.Provider value={{store, dispatch}}>
        {/*Wrap all the components involved in the app's routing */}
          <Router>
            <Navigation /> {/*It is in the browser router because it uses the Link component*/}
            <Routes>
              <Route path="/" element={<Navigate to="messages" replace/>} />
              <Route path="messages">
                <Route index element={<Messages />}/>
                <Route path="new" element={
                  loggedInUser?
                    <MessageForm  />
                  :
                    <Navigate to="/login" />
                  } />
                <Route path=":messageId" element={<MessageDetail />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="signup" element={<SignupForm />} />
              <Route path="*" element={<Notfound />} /> {/* for everything else routes render notFound component*/}
            </Routes>
          </Router>
        </StateContext.Provider>
    </div>
  )
}

export default App
