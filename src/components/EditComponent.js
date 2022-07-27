import { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getToken } from "../services/authorize";


const EditComponent=()=>{
    const params = useParams()

    const [state,setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    const {title,author,slug} = state

    const [content,setContent] = useState('')

    const submitContent = (event) =>{
        setContent(event)
    }

    const inputValue = name=>event=>{
        setState({...state,[name]:event.target.value});
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
        .then(response =>{
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    const showUpdateForm=()=>(
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
                <button className="btn btn-success mt-4" type="submit">Edit Article</button>
            </div>
        </form>
        </div>
    )

    const submitForm =(e)=> {
        e.preventDefault();
        console.log("API URL = ",process.env.REACT_APP_API)
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author},
        {
            headers:{
                Authorization: `Bearer ${getToken()}`
            }
        }
        )
        .then(response=>{
            Swal.fire(
                'Notify!',
                'Updated',
                'success'
              )
              const {title,content,author,slug} = response.data
              setState({...state,title,author,slug})
              setContent(content)
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
            <div className = "container">
                {showUpdateForm()}
            </div>
        </div>
      );
}

export default EditComponent;