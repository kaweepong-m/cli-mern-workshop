import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import '../App.css'
import { getToken, getUser } from "../services/authorize";

const FormComponent=()=>{
    const [state,setState] = useState({
        title:"",
        author:getUser()
    })
    const {title,author} = state

    const [content,setContent] = useState('')

    const inputValue = name=>event=>{
        setState({...state,[name]:event.target.value});
    }

    const submitContent = (event) =>{
        setContent(event)
    }

    const submitForm =(e)=> {
        e.preventDefault();
        console.log("API URL = ",process.env.REACT_APP_API)
        axios.post(`${process.env.REACT_APP_API}/create`,{title,content,author}
        ,{
            headers:{
                Authorization: `Bearer ${getToken()}`
            }
        }
        ).then(response=>{
            Swal.fire(
                'Notify!',
                'Saved',
                'success'
              )
              setState({...state,title:"",author:""})
              setContent("")
        }).catch(err=>{
            Swal.fire(
                'Notify!',
                err.response.data.error,
                'error'
              )
        })
    }

    


    return (
        <div>
            <NavbarComponent/>
            <div className = "container mt-5">
                <div className = "col-md-10 offset-md-1 col-xs-12">
                        <form onSubmit={submitForm}>
                            <div className="form-group">
                                <input className="form-control form-control-lg mt-4" type="text" placeholder="Article Title" aria-label=".form-control-lg example" value={title} onChange={inputValue("title")}/>
                            </div>
                            <div className="form-group">
                                <input className="form-control mt-4" type="text" placeholder="Author Name" aria-label=".form-control-lg example" value={author} onChange={inputValue("author")}/>
                            </div>
                            <div className="form-group mt-4">
                                <ReactQuill
                                        value={content}
                                        onChange={submitContent}
                                        theme="snow"
                                        className="pb-5 mb-3"
                                        placeholder="Write your article"
                                        style={{border:'1px solid #666'}}
                                />
                            </div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-success mt-4" type="submit">Publish Article</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
      );
}

export default FormComponent;