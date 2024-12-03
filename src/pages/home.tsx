import { useEffect, useState, useRef } from "react";
import ConfirmComponent from "../components/messagesComponent";
import useChat from "../hooks/useChat";
import { Message } from "../hooks/useChat";
import "../style/home.css";
import createPlan from "../services/createPlan";

export interface Info {
  age: number;
  weight: number;
  height: number;
  daysOfTraining: number;
  goal: string;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Home() {
  const [shouldContinue, setContinue] = useState<boolean>(false);
  const [shownIntro, setShownIntro] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id_message: "bienvenida",
      sender: "bot",
      text: "Hola, bienvenido a AITrainer, yo sere tu entrenador personal, estas listo para iniciar la creación de tu nueva rutina de entrenamiento?",
    },
    {
      id_message: "continuar",
      sender: "bot",
      text: <ConfirmComponent setContinue={setContinue} />,
    },
  ]);
  const [values, setValues] = useState<Info>({
    age: 0,
    weight: 0,
    height: 0,
    daysOfTraining: 0,
    goal: "",
  });

  const [waitingForAnswer, setwaitingForAnswer] = useState(false);
  const [index, setIndex] = useState(0);

  const [finishedQuestions, setFinishedQuestions] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");

  // funcion para obtener los valores que ingrese el usuario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // funcion para dejar de esperar por la respuesta del usuario
  async function nextQuestion() {
    await sleep(1000);
    setwaitingForAnswer(false);
  }

  // funcion para añadir nuevos mensajes
  function addNewMessage(newMessage: Message[]) {
    setMessages((prevMessages) => [...prevMessages, ...newMessage]);
  }

  // funcion para eliminar un mensaje
  function deleteMessages(id: string) {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id_message !== id)
    );
  }

  const valuesRef = useRef(values);
  // Actualiza la referencia siempre que los valores cambian
  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  // crea el plan con la info del user
  async function handleCreate() {
    await createPlan(
      valuesRef.current,
      setErrorInfo,
      addNewMessage,
      deleteMessages
    );
  }

  // MENSAJES
  const messagesToSend: Message[] = [
    {
      id_message: "años_bot",
      sender: "bot",
      text: "¿Cuantos años tienes?",
    },
    {
      id_message: "años_user",
      sender: "user",
      text: (
        <>
          <input
            name="age"
            onChange={handleChange}
            type="number"
            min={14}
            max={60}
            placeholder="Ingresa aqui tu edad"
          />
          <button className="user_button" onClick={nextQuestion}>
            Siguiente
          </button>
        </>
      ),
    },
    {
      id_message: "peso_bot",
      sender: "bot",
      text: "¿Cuanto pesas en kilogramos?",
    },
    {
      id_message: "peso_user",
      sender: "user",
      text: (
        <>
          <input
            name="weight"
            onChange={handleChange}
            type="number"
            min={20}
            max={250}
            placeholder="Ingresa aqui tu peso (kg)"
          />
          <button className="user_button" onClick={nextQuestion}>
            Siguiente
          </button>
        </>
      ),
    },
    {
      id_message: "altura_bot",
      sender: "bot",
      text: "¿Cuanto mides en metros?",
    },
    {
      id_message: "altura_user",
      sender: "user",
      text: (
        <>
          <input
            name="height"
            onChange={handleChange}
            type="number"
            min={0.6}
            max={2.6}
            placeholder="Ingresa aqui tu altura (metros)"
          />
          <button className="user_button" onClick={nextQuestion}>
            Siguiente
          </button>
        </>
      ),
    },
    {
      id_message: "dias_bot",
      sender: "bot",
      text: "¿Cuantos dias tienes pensado entrenar?",
    },
    {
      id_message: "dias_user",
      sender: "user",
      text: (
        <>
          <input
            name="daysOfTraining"
            onChange={handleChange}
            type="number"
            min={1}
            max={7}
            placeholder="Ingresa aqui los dias a entrenar (1-7)"
          />
          <button className="user_button" onClick={nextQuestion}>
            Siguiente
          </button>
        </>
      ),
    },
    {
      id_message: "obj_bot",
      sender: "bot",
      text: "¿Cual es tu objetivo corporal?",
    },
    {
      id_message: "obj_user",
      sender: "user",
      text: (
        <>
          <select name="goal" onChange={handleChange} defaultValue="">
            <option value="" disabled>
              Seleccione una opcion
            </option>
            <option value="perder peso">Perder peso</option>
            <option value="ganar músculo">Ganar músculo</option>
            <option value="mantenerse">Mantenerse</option>
          </select>
          <button className="user_button" onClick={nextQuestion}>
            Siguiente
          </button>
        </>
      ),
    },
    {
      id_message: "create",
      sender: "bot",
      text: "¡Ok, con esta información estoy listo para crear tu plan!",
    },
    {
      id_message: "create_button",
      sender: "bot",
      text: (
        <button
          className="user_button"
          onClick={async () => {
            setFinishedQuestions(true);
            // envia la info al servidor
            handleCreate();
          }}
        >
          Crear plan
        </button>
      ),
    },
  ];

  useEffect(() => {
    async function sendMessages() {
      // muestra la introduccion a las preguntas solo una ves
      if (shouldContinue == true && shownIntro == false) {
        addNewMessage([
          {
            id_message: "intro",
            sender: "bot",
            text: "Ok, para crearte un plan personalizado voy a necesitar que respondas las siguientes preguntas:",
          },
        ]);
        setShownIntro(true);
      }
      await sleep(1000);
      // hace las preguntas necesarias para conseguir la informacion
      if (
        shouldContinue == true &&
        shownIntro == true &&
        index < messagesToSend.length &&
        waitingForAnswer == false
      ) {
        addNewMessage([messagesToSend[index]]);
        await sleep(500);
        addNewMessage([messagesToSend[index + 1]]);
        setIndex(index + 2);
        setwaitingForAnswer(true);
      }
      sleep(1000);
      // recolecta la info y hace el plan
      if (finishedQuestions == true) {
        if (errorInfo) {
          deleteMessages("errores");
          addNewMessage([
            {
              id_message: "errores",
              sender: "bot",
              text: (
                <div>
                  <span>La info ingresada tiene los siguientes errores: </span>{" "}
                  <br />
                  <span className="errors">{errorInfo}</span> <br />
                  <span>
                    Porfavor ingresa la info de manera correcta y presiona
                    "Crear plan"
                  </span>
                </div>
              ),
            },
          ]);
        }
      }
    }
    sendMessages();
  }, [
    shouldContinue,
    waitingForAnswer,
    shownIntro,
    finishedQuestions,
    errorInfo,
  ]);

  return useChat(messages);
}

export default Home;
