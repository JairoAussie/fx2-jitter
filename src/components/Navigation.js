/* eslint-disable */
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import { useEffect} from 'react'
import { getMessages, getMessagesByUser, getMyMessages } from '../services/messagesServices'
import {  } from 'react-router-dom'

// import { getMyMessages } from "../services/messagesServices"

const Navigation = () => {
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    const location = useLocation()
    // need to select the right list of messages in componentDidMount and componentDid Update
    // Declaring this in the navigation component as this is the navigation component that always render 
    // and is inside of the routing, therefore, we can use location
    useEffect(
      displayMessages(location, dispatch) 
      , 
      []
    ) 
    useEffect(
      displayMessages(location, dispatch)
      , 
      [location] 
    ) 
    
    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault()
        sessionStorage.clear()
        dispatch({
            type: "setLoggedInUser",
            data: null 
        })
        dispatch({
            type: "setToken",
            data: null 
        })
        navigate("/messages")
    }

    
    return (
        <AppBar position="sticky">
            <Typography variant='h3'>Jitter</Typography>
            <Toolbar>
                <Tabs value={false}>
                    <Tab label="Home" value="/messages" component={Link} to="/messages" />
                    <Tab label="About" component={Link} to="/about" />
                    { loggedInUser && <Tab label="New message" component={Link} to="/messages/new" />}
                    { loggedInUser && <Tab label="My messages" component={Link} to="/messages/mymessages" />}
                    { loggedInUser && <Tab label="Logout" onClick={logout} component={Link} to="/messages" />}
                    { !loggedInUser && <Tab label="Login" component={Link} to="/login" />}
                    { !loggedInUser && <Tab label="Signup" component={Link} to="/signup" />}
                </Tabs>
                
            </Toolbar>

        </AppBar>
                       
    )

}

export default Navigation

const displayMessages = (location, dispatch, setError) =>{
    return () => {
      if (location.pathname === "/messages/mymessages") {
        getMyMessages()
          .then(messages => {
            // console.log("my messages")
            dispatch({
              type: "setMessageList",
              data: messages
            })
            // console.log(messages)
          })
          .catch(e => { console.log(e) })
      } else if (location.pathname.includes('/messages/user/')) {
        //get the username from the url without using useParams
        let index = location.pathname.lastIndexOf('/');
        let username = location.pathname.slice(index + 1);
        getMessagesByUser(username)
          .then(messages => {
            // console.log("messages by user")
            if (messages.error){
                // set the list as empty when the find by user returns an error
                dispatch({
                    type: "setMessageList",
                    data: []
                    })
            } else {
                dispatch({
                    type: "setMessageList",
                    data: messages
                })
            }
          })
          .catch(e => { console.log(e) })
      }
  
      else {
        getMessages()
          .then(messages => {
            // console.log("all messages")
            dispatch({
              type: "setMessageList",
              data: messages
            })
          })
          .catch(e => { console.log(e) })
      }
  
    }
  }