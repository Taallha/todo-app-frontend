import { useState ,useEffect} from "react"
import { useNavigate, useParams} from "react-router-dom"
import { useAuth } from "../security/AuthContext"
import { createTodoApi, retrieveTodoApi, updateTodoApi }  from '../ApiService/TodoAppApi.jsx'
import { Field, Formik ,Form,ErrorMessage} from "formik"
import moment from "moment/moment"

export default function Todo(){
    
    const authContext = useAuth()
    const username = authContext.username
    const {id} = useParams()
    const[description,setDescription]  = useState(null)
    const[targetDate,setTargetDate]  = useState(null)
    const Navigate =useNavigate()


    useEffect(() => retrieveTodo())
    
    
    function retrieveTodo(){
        if(id != -1 ){
            console.log(username,id)
            retrieveTodoApi(username,id)
            .then(
                (response) =>
                {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)

                    console.log(response.data)
                }
            )
            .catch(()=>console.error(),console.log(username,id,"retrievetodo error"))

        }       
    }
    function onSubmit(values){
        console.log(values)
        const todo = {
            id : id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done : false
        }
        if(id == -1){

            createTodoApi(username,todo)
            .then((response)=>
            console.log(response),
            Navigate("/todos")
            )
            .catch((error) => console.log(error))


        }else{
            updateTodoApi(id,username,todo)
            .then((response)=>
            console.log(response),
            Navigate("/todos")
            )
            .catch((error) => console.log(error))

        }




       
    }
    function validate(values){
        let errors=
        {
            //description : "Enter at least five characters"
        }

        if( values.description.length<5){
            errors.description = "Enter at least five characters "
       
        }
        if(values.targetDate == "" || values.targetDate == null ||!moment(values.targetDate).isValid()){
            errors.targetDate = "Enter a valid date"
        }
        return errors
    }


    return (

        <div className="Todo">
            <h1>To-do details </h1>
            <div className="container">
                <div className="row">  
                    <Formik initialValues={{description,targetDate}}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                    >
                        {
                            (props) =>
                            <Form className="col-md-12">
                                <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-danger" />

                                <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-danger" />

                                
            

                                <div className="col mb-5 alert alert-success">
                                    <fieldset className="form-group">
                                        <label className=" mt-3 h5 fw-bold">Description</label>
                                        <Field type="text"  className="form-control form-field " name="description"></Field>
                                    </fieldset>
                                </div>
                                <div className="col mb-5 ">
                                    <fieldset className="form-group alert alert-success">
                                        <label className="mt-3 h5 fw-bold">Target Date</label>
                                        <Field type="date" className="form-control" name="targetDate"></Field>
                                    </fieldset>
                                </div>
                                <div>
                                    <button className="btn btn-success btn-xl" type="submit">Submit</button>
                                </div>
                            </Form>
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )

}