import "../style/login.css";
import dumbbellsPhoto from "../assets/pexels-pixabay-260352.jpg";
import { useEffect, useState } from "react";
// import google from "../assets/google.png";
import Password from "../components/passwordInput";
import { path } from "../path";
import login from "../services/loginAccount";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

function Login() {
  const context = useUser()

  const navigate = useNavigate()

  useEffect(()=>{
    if (!context?.loading && context?.user) {
      navigate("/")
    }
  },[context?.loading, context?.user])

  const [photoPadding, setPhotoPadding] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const [values, setValues] = useState({
    email: null,
    password: null
  })

  useEffect(() => {
    function adjustWindow() {
      const width = window.innerWidth;
      if (width < 1000) {
        setPhotoPadding(0);
      } else {
        setPhotoPadding(17);
      }
    }

    adjustWindow();
    window.addEventListener("resize", adjustWindow);

    return () => {
      window.removeEventListener("resize", adjustWindow);
    };
  }, []);

  function handleGoogle(e: any) {
    e.preventDefault();
    location.replace(`${path}/google`);
  }

  function handleChange(e: any){
    const {name, value} = e.target
    setValues((oldValues) => ({
        ...oldValues,
        [name]: value
    }))
  }

  function handleClick(e: any) {
    e.preventDefault()
    login(values.email,values.password,setErrors, navigate, context?.change, context?.setChange)
  }

  return (
    <div className="main_login">
      <section
        className="login_image"
        style={{ paddingLeft: `${photoPadding}%` }}
      >
        <img src={dumbbellsPhoto} alt="mancuernas" />
      </section>
      <section>
        <form className="login_form" onChange={handleChange}>
          <h3>Iniciar sesión</h3>
          <input
            className="email_login"
            type="text"
            name="email"
            placeholder="Correo electrónico"
          />
          <Password
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            first={true}
            className="password_login"
          />
          {errors && <span className="errors">{errors}</span>}
          <button className="send_login" onClick={handleClick}>Enviar</button>
          {/* <span
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            o
          </span>
          <button className="continue_google_login" onClick={handleGoogle}>
            Continuar con Google <img src={google} alt="google" />
          </button> */}
        </form>
      </section>
    </div>
  );
}

export default Login;
