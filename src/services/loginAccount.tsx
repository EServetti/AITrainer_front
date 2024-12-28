import axios from "axios"
import { path } from "../path"


function login(email: string | null, password: string | null, setErrors: React.Dispatch<React.SetStateAction<string>>, navigate: any) {
    if (!email || !password) {
        setErrors("Ingrese su contraseña y correo electrónico")
    } else {
        setErrors("")
        axios.post(`${path}/login`,{email, password},{withCredentials:true}).then((res)=> {
            const response = res.data
            if (response.statusCode !== 200) {
                setErrors(response.message)
            } else {
                navigate("/")
            }
        })
    }
}

export default login