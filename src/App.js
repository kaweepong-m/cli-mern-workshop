import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import{useState,useEffect} from "react";
import{Link} from "react-router-dom";
import Swal from "sweetalert2";
import parse from 'html-react-parser';
import { getUser,getToken } from "./services/authorize";

//import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';



function App() {
  const [blogs,setBlogs] = useState([])

  const fetchData=()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blogs`)
    .then(response=>{
      setBlogs(response.data)
    })
    .catch(err=>alert(err));
  }
  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete=(slug)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteBlog(slug)
        }
      })
  }
  const deleteBlog=(slug)=>{
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
    {
      headers:{
          Authorization: `Bearer ${getToken()}`
      }
  }
    )
    .then(response=>{
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      fetchData()
    }).catch(err=>console.log(err))
  }


  
  return (
      <div>
        <NavbarComponent/>
        <section className="grid-container py-5">
          <div className="container px-4 px-lg-5 mt-5">
              <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {blogs.map((blog,index)=>(
                  <div className="col mb-5">
                      <div className="card h-100">
                          <div className="card-body p-4">
                              <div className="text-center">
                                  <Link to={`/blog/${blog.slug}`}>
                                    <h5>{blog.title.substring(0,250)}</h5>
                                  </Link>
                                  <p className="pt-2">{parse(blog.content.substring(0,250))}</p>
                                  <p className="card-subtitle text-muted">author : {blog.author}</p>
                                  <p className="card-subtitle text-muted">created : {new Date(blog.createdAt).toLocaleString()}</p>
                              </div>
                          </div>
                          {getUser() &&(
                              <div class="gap-2 d-flex justify-content-center mb-4">
                                <Link to={`/blog/edit/${blog.slug}`}>
                                  <button type="button" className="btn btn-outline-success">Edit</button>
                                </Link>
                                  <button type="button" className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>Delete</button>
                              </div>
                            )
                          }
                      </div>
                  </div>
        ))}
              </div>
          </div>
        </section>
      </div>
  );
}

export default App;
