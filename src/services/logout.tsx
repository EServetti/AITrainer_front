import axios from "axios";
import { path } from "../path";

function logout() {
    axios.post(`${path}/logout`, {}, {withCredentials: true}).then((res)=>{
        const response = res.data
        
        if (response.statusCode === 200) {
            location.replace("/")
        }
    })
}

export default logout