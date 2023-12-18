
import { apiClient } from "./ApiClient";





    


export const retrievePathVariableHelloWorld =  (name) =>  apiClient.get(`/path-variable/${name}`,
{
    headers :{
        Authorization : 'Basic dGFsaGE6MTIzNDU2'
        
    }
})

export const retrieveHelloWorld =  (token) =>  apiClient.get("/str-hello-world")

