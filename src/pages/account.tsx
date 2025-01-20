import { useEffect, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { useUser } from "../context/userContext";
import "../style/account.css";
import { useNavigate } from "react-router-dom";
import { User_data } from "../types";
import sendData from "../services/sendUserData";

function Account() {
  const context = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!context?.loading && !context?.user) {
      navigate("/");
    }
  }, [context?.loading, context?.user]);

  // ajustar pantalla segun tamaño

  const [display, setDisplay] = useState(true);
  useEffect(() => {
    function adjustWindow() {
      const width = window.innerWidth;

      if (width < 1000) {
        setDisplay(false);
      } else {
        setDisplay(true);
      }
    }
    adjustWindow();

    window.addEventListener("resize", adjustWindow);

    return () => {
      window.removeEventListener("resize", adjustWindow);
    };
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState("");

  const [values, setValues] = useState<User_data>({
    date_of_birth: null,
    weight: null,
    height: null,
    goal: null,
    bodyType: null,
    difficulty: null,
  });

  function handleChange(e: any) {
    e.preventDefault();
    const { name, value } = e.target;
    setValues((oldValues) => ({
      ...oldValues,
      [name]: value,
    }));
  }

  function handleClick(e: any) {
    e.preventDefault();
    const hasData = context?.user?.planData ? true : false;
    sendData(context?.user?.id, values, hasData, setErrors);
  }

  const planData = context?.user?.planData;
  const birthDate = new Date(
    context?.user?.date_of_birth as string
  ).toLocaleDateString();

 
  return (
    <>
      <div className="main_account">
        <div
          style={
            !display
              ? { display: "none" }
              : {
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20%",
                  marginRight: "20px",
                }
          }
        >
          <h3>¿Para qué sirven estos datos?</h3>
          Estos datos se utilizarán para la creación rápida de planes, podrás
          cambiarlos en cualquier momento.
        </div>
        <section className="user_info">
          <span className="image_info">
            <span>
              <div>
                {context?.user?.first_name} {context?.user?.last_name}
              </div>
              {context?.user?.email}
            </span>
            <img src={context?.user?.photo} alt="user" />
          </span>
          {showForm ? (
            <>
              <form className="plan_data_form" onChange={handleChange}>
                <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
                <input
                  name="date_of_birth"
                  id="dateOfBirth"
                  type="date"
                  min="1925-01-01"
                  max="2019-01-01"
                />
                <input type="number" placeholder="Peso en kg" name="weight" />
                <input type="number" placeholder="Altura en cm" name="height" />
                <input
                  type="text"
                  max={150}
                  placeholder="Objetivo"
                  name="goal"
                />
                <select name="bodyType" defaultValue="">
                  <option value="" disabled>
                    Tipo de cuerpo
                  </option>
                  <option value="ectomorfo">Ectomorfo</option>
                  <option value="endomorfo">Endomorfo</option>
                  <option value="mesomorfo">Mesomorfo</option>
                </select>
                <select name="difficulty" defaultValue="">
                  <option value="" disabled>
                    Dificultad
                  </option>
                  <option value="facil">Fácil</option>
                  <option value="medio">Medio</option>
                  <option value="dificil">Difícil</option>
                </select>
                <button onClick={handleClick}>Cargar</button>
                {errors && <div className="errors">{errors}</div>}
              </form>
            </>
          ) : context?.user?.planData ? (
            <section className="user_data">
              <div>
                <span>Fecha de nacimiento: </span>
                <span>{birthDate}</span>
                <span>Cuerpo: </span>
                <span>{planData?.bodyType}</span>
                <span>Altura: </span>
                <span>{planData?.height}</span>
                <span>Peso: </span>
                <span>{planData?.weight}</span>
                <span>Dificultad de entrenamiento: </span>
                <span>{planData?.difficulty}</span>
                <span>Objetivo: </span>
                <span>{planData?.goal}</span>
              </div>
              <button
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid white",
                  backgroundColor: "#0A192F",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowForm(true);
                }}
              >
                Actualizar datos
              </button>
            </section>
          ) : (
            <span
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <h4>
                Todavia no cargaste datos extra a tu cuenta, ¿quieres hacerlo?
              </h4>
              <button
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid white",
                  backgroundColor: "#0A192F",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowForm(true);
                }}
              >
                Siguiente
              </button>
            </span>
          )}
        </section>
      </div>
    </>
  );
}

export default Account;
