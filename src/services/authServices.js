import jitterAPI from "../config/api";

export async function signUp(data){
    const response = await jitterAPI.post('/auth/signup', data)
    //console.log(response.data)
    return response.data
}

export async function signIn(data){
    const response = await jitterAPI.post('/auth/signin', data)
    //console.log(response.data)
    return response.data
}

