import { createContext, useState, useContext, ReactNode, useEffect, useRef } from "react";
import { Message } from "../pages/home";
import createPlan from "../services/createPlan";
import ConfirmComponent from "../components/messagesComponent";

interface ConversationContextType {
  messages: any; 
  setMessages: React.Dispatch<React.SetStateAction<any>>; 
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

interface ConversationProviderProps {
  children: ReactNode; 
}

export interface Info {
  age: number;
  weight: number;
  height: number;
  daysOfTraining: number;
  goal: string;
  trainingTime: string;
  sex: string;
  bodyPart: string;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ConversationProvider({ children }: ConversationProviderProps) {
  const [shouldContinue, setContinue] = useState<boolean>(false);
  const [shownIntro, setShownIntro] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id_message: "bienvenida",
      sender: "bot",
      text: "Hola, bienvenido a AITrainer, seré tu entrenador personal, ¿estás listo para comenzar a crear tu nueva rutina de entrenamiento?",
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
    trainingTime: "",
    sex: "",
    bodyPart: "",
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
      text: "¿Cuántos años tienes?",
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
            placeholder="Ingresa aquí tu edad"
          />
          <button className="user_button" onClick={nextQuestion}>
            Siguiente
          </button>
        </>
      ),
    },
    {
      id_message: "sexo_bot",
      sender: "bot",
      text: "¿Cuál es tu género?",
    },
    {
      id_message: "sexo_user",
      sender: "user",
      text: (
        <>
          <select
            name="sex"
            onChange={handleChange}
            defaultValue="no especificado"
          >
            <option value="no especificado">No especificar</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <button className="user_button" onClick={nextQuestion}>
            Siguiente
          </button>
        </>
      ),
    },
    {
      id_message: "peso_bot",
      sender: "bot",
      text: "¿Cuánto pesas en kilogramos?",
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
            placeholder="Ingresa aquí tu peso (kg)"
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
      text: "¿Cuánto mides en metros?",
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
            placeholder="Ingresa aquí tu altura (metros)"
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
      text: "¿Cuántos días tienes pensado entrenar? ¿Cuánto tiempo quieres dedicar a cada sesión de entrenamiento?",
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
            placeholder="Ingresa aquí los días a entrenar (1-7)"
          />
          <select name="trainingTime" onChange={handleChange} defaultValue="">
            <option value="" disabled>
              Ingrese el tiempo de entrenamiento
            </option>
            <option value="1/2h-1h">30min a 1h</option>
            <option value="1h-3/2h">1h a 1h/30min</option>
            <option value="3/2h-2h">1h/30min a 2h</option>
            <option value="+2h">Más de 2h</option>
          </select>
          <button className="user_button" onClick={nextQuestion}>
            Siguiente
          </button>
        </>
      ),
    },
    {
      id_message: "obj_bot",
      sender: "bot",
      text: "¿Cuál es tu objetivo corporal? ¿Tienes alguna zona específica que mejorar?",
    },
    {
      id_message: "obj_user",
      sender: "user",
      text: (
        <>
          <select name="goal" onChange={handleChange} defaultValue="">
            <option value="" disabled>
              Seleccione un objetivo corporal
            </option>
            <option value="perder peso">Perder peso</option>
            <option value="ganar músculo">Ganar músculo</option>
            <option value="aumentar resistencia">Aumentar resistencia</option>
            <option value="mantenerse">Mantenerse</option>
          </select>
          <select name="bodyPart" onChange={handleChange} defaultValue="">
            <option value="" disabled>
              Seleccione una parte del cuerpo
            </option>
            <option value="ninguna parte en especifico">
              Ninguna parte en especifico
            </option>
            <option value="pecho">Pecho</option>
            <option value="espalda">Espalda</option>
            <option value="brazos">Brazos</option>
            <option value="piernas">Piernas</option>
            <option value="abdomen">Abdomen</option>
            <option value="tren_superior">Tren superior</option>
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
            text: "Ok, para poder crear un plan personalizado para ti necesitaré que respondas las siguientes preguntas:",
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

  return (
    <ConversationContext.Provider value={{ messages, setMessages }}>
      {children}
    </ConversationContext.Provider>
  );
}

export const useConversation = (): ConversationContextType => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
};
