import { createContext, useContext, useState } from "react"
import { retrieveToken } from "../ApiService/AuthenticationApiService"
import { apiClient } from "../ApiService/ApiClient"

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)




export default function AuthProvider({children}){

    const[isAuthenticated, setIsAuthenticated] = useState(false)
    const[username,setUsername] = useState(null)
    const[token,setToken] = useState(null)


    async function login(username,password){

       
        // Basic dGFsaGE6MTIzNDU2
        // Basic dGFsaGE6MTIzNDU2
        try{
             const response = await retrieveToken(username,password)
            if(response.status == 200){
                const jwtToken = "Bearer "+response.data.token
                setUsername(username)
                setToken(jwtToken)
                setIsAuthenticated(true)

                apiClient.interceptors.request.use(
                    (config)=>
                    {
                        config.headers.Authorization=jwtToken
                        console.log(config)
                        return config
                    }
                )
                return true
            }else{
                logout()
                return false
            }
        }catch(error){

            logout()
            return false
        }

    }
        
    function logout(){
        return(
            setIsAuthenticated(false),
            setToken(null),
            setUsername(null)
        )
    }
    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,username,token}} >
            {children}
        </AuthContext.Provider>
    )
}