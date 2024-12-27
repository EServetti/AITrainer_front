import axios from "axios";
import { registerInfo } from "../types";
import {path} from "../path";
import Swal from "sweetalert2";


async function register(values: registerInfo, setErrors: React.Dispatch<React.SetStateAction<string>>) {
    if (!values.first_name || !values.last_name || !values.email || !values.sex || !values.date_of_birth || !values.password) {
        setErrors("Por favor complete el formulario de registro")
    }
    else if (values.password !== values.password_2) {
        setErrors("Las contraseñas deben coincidir")
    } else {
        setErrors("")
        axios.post(`${path}/register`,{
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            sex: values.sex,
            date_of_birth: values.date_of_birth,
            password: values.password
        },{withCredentials: true}).then((res)=> {
            const response =  res.data
            if (response.statusCode !== 201) {
                setErrors(response.message)
            } else {
                Swal.fire({
                    title: "Registrado",
                    text: "Para usar tu cuenta debes verificarla a través de el email que te enviamos.",
                    confirmButtonText: "Continuar",
                    customClass: {
                        popup: "swal-popup",
                    }
                })
            }
        })
    }
}

export default register