import { useNavigate } from "react-router-dom"
import { useAuth } from "../security/AuthContext"
import { retrieveTodos,deleteTodoById } from "../ApiService/TodoAppApi"
import { useEffect, useState } from "react"
export default function ListTodo(){




    const[todos,setTodos] = useState([])
    const[message,setMessage] = useState(null)
    const authContext = useAuth()
    const username = authContext.username
    const Navigate = useNavigate()


    useEffect( () => loadTodos(),[])

    function loadTodos(){

        retrieveTodos(username)
        .then( 
            (response) =>
            {
                console.log(response.data)
                console.log(username)
                setTodos(response.data)
                
            }  
        )
        .catch(
            (error) => console.log(error)
        )
    
    }
    function updateTodo(id){

        Navigate(`/todo/${id}`)
    }


    function deleteTodo(id){
        deleteTodoById(username,id)
        .then(
            () => 
            {
                setMessage(`you delete your id = ${id} todo`)
                loadTodos()
            }
           
        )
        .catch(
            (error) => console.log(error)
        )
        .finally()
        
    }
    function rotate(){
        Navigate("/todo/-1")
    }


    return(
        <div className="container">
            <h1 className="mb-4">Your To-Do List</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Is Done </th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>

                    </tr>
                </thead>
                <tbody>
                    {todos.map(
                        todo => 
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{todo.targetDate.toString()}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                            <td><button className="btn btn-warning" onClick={() => updateTodo(todo.id)}>Update</button></td>




                        </tr>

                    )}
                </tbody>

                </table>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={rotate}>ADD TODO</button>
            </div>
        </div>


    )


}