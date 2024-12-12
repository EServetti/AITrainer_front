import axios from "axios";
import { sleep } from "../pages/home";
import { path } from "../path";
import returnPlan from "./returnPlan";
import { Info, Message } from "../types";

async function createPlan(
  infoUser: Info,
  setErrors: React.Dispatch<React.SetStateAction<string>>,
  addNewMessage: (messages: Message[]) => any,
  deleteMessages: (id: string) => any,
) {
  // agrega mensaje "cargando"
  addNewMessage([
    {
      id_message: "cargando",
      sender: "bot",
      text: (
        <div className="loadingContainer">
          <span>Cargando</span>
          <div className="spinner"></div>
        </div>
      ),
      typeOfAnswer: null
    },
  ]);
  axios
    .post(`${path}/plan`, infoUser, { withCredentials: true })
    .then((res) => {
      const response = res.data;
      if (response.statusCode == 400) {
        // eliminar el mensaje "cargando"
        deleteMessages("cargando");
        // agregar errores
        setErrors(response.message);
      } else if (response.statusCode == 200) {
        deleteMessages("errores")
        deleteMessages("cargando");
        deleteMessages("create_button")
        addNewMessage([{
          id_message: "enviando_mensaje",
          sender: "bot",
          text: "Aqui tienes un plan de entrenamiento que se ajusta a tus especificaciones:",
          typeOfAnswer: null
        }])
        sleep(1000)
        returnPlan(response.message, addNewMessage)
      }
    });
}

export default createPlan;
