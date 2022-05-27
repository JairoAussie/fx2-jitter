//alternative to useState, more complex more powerful, more flexible
//useState is a syntactic sugar of useReducer that simplifies it 
//kind of Redux

//reducer function
//it receives 2 parameters
// it receives the current state
//it receives the action we want to implement to the state
//based in action the function will update the state one way or another
//action is an object with 2 keys, type and data.

export const reducer = (state, action) => {
    console.log(state)
    console.log(action)
}