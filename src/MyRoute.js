import {BrowserRouter , Routes , Route , Navigate} from "react-router-dom"
import App from "./App";
import FormComponent from "./components/FormComponent"
import SingleComponent from "./components/SingleComponent";
import EditComponent from "./components/EditComponent";
import LoginComponent from "./components/LoginComponent";
import { getUser } from "./services/authorize";

const MyRoute=({component:Component,...rest})=>{

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/create" element={getUser() ? <FormComponent/> : <Navigate to = "/login"/>} />
                <Route path="/blog/:slug" element={<SingleComponent />} />
                <Route path="/blog/edit/:slug" element={getUser() ? <EditComponent/> : <Navigate to = "/login" />} />
                <Route path="/login" element={<LoginComponent />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoute;