import NavbarComponent from "./NavbarComponent";
import React, { useState,useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../services/authorize";
import {useNavigate} from "react-router-dom"

const LoginComponent=() =>{
    let navigate = useNavigate();

    const [state,setState] = useState({
        username:"",
        password:""
    })
    const {username,password} = state

    const inputValue = name=>event=>{
        setState({...state,[name]:event.target.value});
    }

    const submitForm =(e)=> {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
            authenticate(response,()=>navigate("/"))
        }).catch(err=>{
            Swal.fire(
                'Notify!',
                err.response.data.error,
                'error'
              )
        })
    }

    useEffect(()=>{
        getUser()  && navigate('/')
        // eslint-disable-next-line
    },[])

    return(
        <div>
            <NavbarComponent/>
            <div className = "container mt-5">
                <div className = "col-md-10 offset-md-1 col-xs-12">
                        <form onSubmit={submitForm}>
                            <div className="form-group">
                                <input className="form-control form-control-lg mt-4" type="text" placeholder="Username" aria-label=".form-control-lg example" value={username} onChange={inputValue("username")}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control form-control-lg mt-4" type="password" placeholder="Password" aria-label=".form-control-lg example" value={password} onChange={inputValue("password")}/>
                            </div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-success mt-4" type="login">Login</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}
export default LoginComponent