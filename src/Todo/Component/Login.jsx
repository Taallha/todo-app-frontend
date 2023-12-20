import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { Card, Form, Button, Alert } from 'react-bootstrap';

export default function Login(){

    const[username, setUsername] = useState('Talha');
    const[password, setPassword] = useState('');
    const[errorMessage, setErrorMessage] = useState(false)
    const[message, setMessage] = useState("")
    const navigate = useNavigate();
    const authContext = useAuth()




    async function handleSubmit() {
        if(await authContext.login(username,password)){
            navigate(`/welcome/${username}`)

        }else {
            setErrorMessage(true)
            setMessage("Kullanıcı adı veya parolanız yanlış !")
            
        }
        
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }






/** 
    return (
        
        <div className="Login">
            <div className="LoginForm">
                <div>
                    {errorMessage && <div className="errorMessage">Wrong username or password</div>}
                    <label className="text fw-bold text-dark">User Name : </label>
                    <input type="text" name="Username"value={username}onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label className="text fw-bold text-dark">Password : </label>
                    <input type="password" name = "password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type ="button" name ="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>

    )
    */

    /** 
    return (
        <div className="Login">
            <div className="LoginForm">
                <Card>
                    <Card.Body>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold text-dark">User Name:</Form.Label>
                                <Form.Control type="text" name="Username" value={username} onChange={handleUsernameChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold text-dark">Password:</Form.Label>
                                <Form.Control type="password" name="password" value={password} onChange={handlePasswordChange} />
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
    */
    return (
        <div className="Login d-flex align-items-center justify-content-center">
            <Card className="custom-card">
                <Card.Body>
                    {errorMessage && <Alert variant="danger">{message}</Alert>}
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold text-dark">Name</Form.Label>
                            <Form.Control type="text" name="Username" value={username} onChange={handleUsernameChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold text-dark">Password</Form.Label>
                            <Form.Control type="password" name="password" value={password} onChange={handlePasswordChange} />
                        </Form.Group>

                        <Button className="m-3 btn-primary"variant="primary" type="button" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );

}
