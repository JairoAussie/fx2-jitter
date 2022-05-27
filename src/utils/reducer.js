//alternative to useState, more complex more powerful, more flexible
//useState is a syntactic sugar of useReducer that simplifies it 
//kind of Redux

//reducer function
//it receives 2 parameters
// it receives the current state
//it receives the action we want to implement to the state
//based in action the function will update the state one way or another
//action is an object with 2 keys, type and data.
// type key determines what is the action we are taking
// data key contains the data necessary to update the state

// the function returns the updated state

export const reducer = (state, action) => {
    console.log(state)
    console.log(action)

    switch(action.type){
        case "cleanState": {
            //State goes back to default values
            return {
                messageList: [],
                loggedInUser: ""
            }
        }
        case "setMessageList": {
            //populate the messageList Array with the inital values
            return {
                ...state,
                messageList: action.data
            }
        }
        case "addMessage": {
            //receives a message and adds it to the list
            return {
                ...state,
                messageList: [action.data, ...state.messageList]
            }
        }
        case "setLoggedInUser": {
            //updates the loggedInUser value
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        default: return state
    }

}