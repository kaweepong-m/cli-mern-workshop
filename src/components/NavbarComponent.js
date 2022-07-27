import { Link,useNavigate } from "react-router-dom";
import { getUser,logout } from "../services/authorize";

const NavbarComponent=()=>{
    let navigate = useNavigate();

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand " to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {
                getUser() && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/create" >New Article</Link>
                  </li>
                )
              }
              {
                !getUser() && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign in</Link>
                  </li>
                )
              }
              {
                getUser() && (
                  <li className="nav-item">
                        <button className="btn btn-outline-danger" onClick={()=>logout(()=>navigate('/'))}>ออกจากระบบ</button>
                  </li>	
                )
              }			
            </ul>		  
          </div>
        </div>
      </nav>
    )
}

export default NavbarComponent;