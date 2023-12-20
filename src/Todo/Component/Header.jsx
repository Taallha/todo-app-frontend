import { Link } from "react-router-dom"
import { useAuth } from "../security/AuthContext"

export default function Header(){
    //const authContext = useContext(AuthContext)
    const authContext = useAuth()
    const isAuth = authContext.isAuthenticated


    function logout(){
        return(
           authContext.logout(false)
        )
    }

    return (
        
        
        <header className="header border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://github.com/Taallha">TalhasProjects</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                {isAuth && <Link className="nav-link" to="/welcome/Talha">Home</Link>}
                             </li>
                            <li className="nav-item fs-5">
                                {isAuth && <Link className="nav-link" to="/todos">Todos</Link>}
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">
                            {!isAuth &&<Link className="nav-link" to="/login">Login</Link>}    
                        </li>
                        <li className="nav-item fs-5">
                            {isAuth && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    )
}