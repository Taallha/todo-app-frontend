import Login from "./Component/Login";
import Error from "./Component/Error";
import { BrowserRouter,Navigate,Route, Routes} from "react-router-dom";
import Welcome from "./Component/Welcome";
import ListTodo from "./Component/ListTodo";
import Logout from "./Component/Logout";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import AuthProvider, { useAuth } from './security/AuthContext';
import Todo from "./Component/Todo";
import "./TodoApp.css";

export default function TodoApp(){


    function AutheticatedRoute({children}){
        const authContext = useAuth()
        if(authContext.isAuthenticated)
            return children

            
        
        return <Navigate to="/" />

        

    }


    return(
        <div className="TodoApp">
           <AuthProvider>
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Login />}  />
                            <Route path="/login" element={<Login />} />
    
                            <Route path="/welcome/:username"element={
                                <AutheticatedRoute>
                                    <Welcome /> 
                                </AutheticatedRoute> 
                            } />
                            
                            
                            <Route path="/todos" element={
                                <AutheticatedRoute>
                                    <ListTodo />
                                </AutheticatedRoute>
                                } 
                                />
                            
                            
                            <Route path="/logout" element={
                                <AutheticatedRoute>
                                    <Logout />
                                </AutheticatedRoute>
                                } 
                            />
                               <Route path="/todo/:id" element={
                                <AutheticatedRoute>
                                    <Todo />
                                </AutheticatedRoute>
                                } 
                            />
                            {/* <Route path="/*" element={
                                <AutheticatedRoute>
                                    <Error />
                                </AutheticatedRoute>
                                } 
                            /> */}
                           


                            <Route path="/*" element={<Error />}></Route>

                        </Routes>
                        <Footer />
                    </BrowserRouter>
            </AuthProvider>
          
    </div>
    )
    
}