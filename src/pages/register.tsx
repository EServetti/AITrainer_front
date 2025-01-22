import "../style/register.css";
// import google from "../assets/google.png";
import Password from "../components/passwordInput";
import { useEffect, useState } from "react";
import { path } from "../path";
import { registerInfo } from "../types";
import register from "../services/createAccount";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const context = useUser()
  const navigate = useNavigate()

  useEffect(()=>{
    if (!context?.loading && context?.user) {
      navigate("/")
    }
  },[context?.loading, context?.user])

  const [values, setValues ] = useState<registerInfo>({
    first_name: null,
    last_name: null,
    sex: null,
    date_of_birth: null,
    email: null,
    password: null,
    password_2: null
  })
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");

  function handleGoogle(e: any) {
    e.preventDefault();
    location.replace(`${path}/google`);
  }

  function handleChange(e: any) {
    const {name, value} = e.target
    setValues((oldValues)=> ({
      ...oldValues,
      [name]: value
    }))
  }

  function handleRegister(e: any) {
    e.preventDefault()
    register(values, setErrors)
  }

  return (
    <div className="main_register">
      <section className="should_register">
        <ul>
          <h3>¿Porque registrarme?</h3>
          <li>Guardar tus planes.</li>
          <li>Creación más rapida de planes.</li>
          <li>Proximamente seguimiento de pesos.</li>
        </ul>
      </section>
      <section>
        <form className="register_form" onChange={handleChange}>
          <h3>Registrarse</h3>
          <input
            className="email"
            type="text"
            name="email"
            placeholder="Correo electrónico"
          />
          <span>
            <input
              className="first_name"
              name="first_name"
              type="text"
              placeholder="Nombre"
            />
            <input
              className="last_name"
              name="last_name"
              type="text"
              placeholder="Apellido"
            />
          </span>
          <span>
            <select className="sex" name="sex" defaultValue="">
              <option disabled value="">
                Género
              </option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="x">No especificar</option>
            </select>
            <input
              className="date_of_birth"
              name="date_of_birth"
              min="1925-01-01"
              max="2019-01-01"
              type="date"
              placeholder="Fecha de nacimiento"
            />
          </span>
          <span>
            <Password
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              first={true}
              className="password"
            />
            <Password
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              first={false}
              className="password"
            />
          </span>
          {errors && <span className="errors">{errors}</span>}
          <button className="send_register" onClick={handleRegister}>Enviar</button>
          {/* <span
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            o
          </span>
          <button className="continue_google" onClick={handleGoogle}>
            Continuar con Google <img src={google} alt="google" />
          </button> */}
        </form>
      </section>
    </div>
  );
}

export default Register;
