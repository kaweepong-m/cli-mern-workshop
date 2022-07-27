import { useParams } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from 'react'
import NavbarComponent from "./NavbarComponent"
import parse from 'html-react-parser';

const SingleComponent  = (prop) => {
    const params = useParams()
    const [blog, setBlog] = useState('')
    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
        .then(response =>{
            setBlog(response.data)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    return(
        <div>
            <NavbarComponent/>
            <div className="container">
            {blog &&
            <div className="col pt-3 pb-2">
                <h1>{blog.title}</h1>
                <p className="text-muted">ผู้เขียน : {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
                <div>{parse(blog.content)}</div>
            </div>
            }
        </div>
        </div>
        )}

export default SingleComponent