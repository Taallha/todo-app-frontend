import { useState } from "react"
import { useParams,Link} from "react-router-dom"
import { retrieveHelloWorld } from  '../ApiService/HelloWorldApi' 
import { useAuth } from "../security/AuthContext"



export default function Welcome(){

    const[message,setMessage] = useState(null)
    const authContext = useAuth()
   

    const {username} = useParams()


    function callHelloWorldApi(){

        retrieveHelloWorld(authContext.token)
        .then(
            (response) => SuccessResponse(response)
        )
        .catch(
            (error) => console.log(error)
        )
        .finally(
        )


    }
   
    

    function SuccessResponse(response){
        console.log(response)
        setMessage(response.data)
        console.log(message)


    }
        return(

            <div className="Welcome">
                <h1>{username} welcome to our todo app </h1>
                <div>
                Manage your todos <Link to="/todos">todos</Link>
                </div>
                <div>
                    <button className="btn mt-5 btn-success" onClick={callHelloWorldApi}> Get Hello-World REST-api </button>
                </div>
                <div className="text-info mt-3">{message}</div>

            </div>
        )
}