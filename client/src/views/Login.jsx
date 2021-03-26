import React, {useState} from 'react';
import Axios from 'axios';
import UserInput from "../components/UserInput";
import {Link, navigate} from "@reach/router";



const Login = (props) => {
    const {setLogged} = props;
    const initialLogin = {
        email:'',
        password:'',
    }
    const [log, setLog] = useState(initialLogin);
    const [errors, setErrors] = useState(initialLogin);

    const changeHandler = e => {
        setLog({
            ...log,
            [e.target.name]:e.target.value
        })
    }
    const submitHandler = e =>{
        e.preventDefault();
        Axios.post("http://localhost:8000/api/login",log,{withCredentials:true})
            .then(response => {
                console.log("Hey, this is working",response);
                if (response.data.user){
                    console.log("this is working too")
                    setLogged(response.data.user);
                    navigate("/api/items");
                    
                }
                else{
                    setErrors(response.data);
                }
            })
            .catch(error => console.log("********woa buddy****login error******",error))
            // navigate("/")
            navigate("/wrongpassword")
    }

    return (
        <div>
            <form className="col-5 mx-auto" onSubmit={submitHandler}>
                <h2>Login</h2>
                <UserInput
                    name="email"
                    value={log.email}
                    error={errors.email}
                    handleChange={changeHandler}
                    label="Email:"
                    type="email"                
                />
                <UserInput
                    name="password"
                    value={log.password}
                    error={errors.password}
                    handleChange={changeHandler}
                    label="Password:"
                    type="password"                
                />
                <UserInput
                    submitValue="Login"
                    type="submit"                
                />
                <br/>
                <Link to="/">Don't have an account?</Link>
            </form>
            
        </div>
    );
};

export default Login;