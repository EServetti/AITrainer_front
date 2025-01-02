import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import "../style/account.css";
import { useNavigate } from "react-router-dom";

function Account() {
  const context = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!context?.loading && !context?.user) {
      navigate("/");
    }
  }, [context?.loading, context?.user]);

  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState("");

  return (
    <div className="main_account">
      <section className="user_info">
        <span className="image_info">
          <span>
            <div>
              {context?.user?.first_name} {context?.user?.last_name}
            </div>
            {context?.user?.email}
          </span>
          <button>
            <img src={context?.user?.photo} alt="user" />
            <span className="tooltip">Cambiar foto</span>
          </button>
        </span>
        {showForm ? (
          <>
            <form className="plan_data_form">
              <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
              <input
                name="dateOfBirth"
                id="dateOfBirth"
                type="date"
                min="1925-01-01"
                max="2019-01-01"
              />
              <input type="number" placeholder="Peso en kg" name="weight" />
              <input type="number" placeholder="Altura en cm" name="height" />
              <input type="text" max={150} placeholder="Objetivo" name="goal" />
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
              <button>Cargar</button>
            </form>
            {errors && <div className="errors">{errors}</div>}
          </>
        ) : context?.user?.planData ? (
          <form></form>
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
  );
}

export default Account;
