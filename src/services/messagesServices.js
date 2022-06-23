import jitterAPI from "../config/api";


export async function getMessages(){
    const response = await jitterAPI.get('/messages')
    //console.log(response.data)
    return response.data

}

export async function createMessage(data){
    const response = await jitterAPI.post('/messages', data)
    console.log(response.data)
    return response.data
}

export async function getMyMessages(){
    const response = await jitterAPI.get('/messages/mymessages')
    //console.log(response.data)
    return response.data

}

export async function getMessagesByUser(username){
    const response = await jitterAPI.get(`/messages?username=${username}`)
    //console.log(response.data)
    return response.data

}

