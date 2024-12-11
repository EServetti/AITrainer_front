import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Message } from "../types";
import createPlan from "../services/createPlan";
import ConfirmComponent from "../components/messagesComponent";
import { ConversationContextType, Info } from "../types";

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

interface ConversationProviderProps {
  children: ReactNode;
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
      typeOfAnswer: null,
    },
    {
      id_message: "continuar",
      sender: "bot",
      text: <ConfirmComponent setContinue={setContinue} />,
      typeOfAnswer: null,
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
  });

  const [waitingForAnswer, setwaitingForAnswer] = useState(false);
  const [index, setIndex] = useState(0);

  const [finishedQuestions, setFinishedQuestions] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");

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
    console.log(values);
    
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
      text: <div>¿Cuántos años tienes?</div>,
      typeOfAnswer: "number",
    },
    {
      id_message: "sexo_bot",
      sender: "bot",
      text: <div>¿Cuál es tu género? (masculino, femenino, x)</div>,
      typeOfAnswer: "string",
    },
    {
      id_message: "peso_bot",
      sender: "bot",
      text: <div>¿Cuánto pesas en kilogramos?</div>,
      typeOfAnswer: "number",
    },
    {
      id_message: "altura_bot",
      sender: "bot",
      text: <div>¿Cuánto mides en centimetros?</div>,
      typeOfAnswer: "number",
    },
    {
      id_message: "dias_bot",
      sender: "bot",
      text: (
        <div>
          ¿Cuántos días tienes pensado entrenar? 
        </div>
      ),
      typeOfAnswer: "number",
    },
    {
      id_message: "horas_bot",
      sender: "bot",
      text: (
        <div>¿Cuánto tiempo quieres dedicar a cada sesión de entrenamiento?</div>
      ),
      typeOfAnswer: "select_hours"
    },
    {
      id_message: "obj_bot",
      sender: "bot",
      text: (
        <div>
          ¿Cuál es tu objetivo corporal? ¿Tienes alguna zona específica que
          mejorar?
        </div>
      ),
      typeOfAnswer: "string",
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
            typeOfAnswer: null,
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
        setIndex(index + 1)
        await sleep(500);
        setwaitingForAnswer(true);
      }
      sleep(1000);
      // recolecta la info y hace el plan
      //   if (finishedQuestions == true) {
      //     if (errorInfo) {
      //       deleteMessages("errores");
      //       addNewMessage([
      //         {
      //           id_message: "errores",
      //           sender: "bot",
      //           text: (
      //             <div>
      //               <span>La info ingresada tiene los siguientes errores: </span>{" "}
      //               <br />
      //               <span className="errors">{errorInfo}</span> <br />
      //               <span>
      //                 Porfavor ingresa la info de manera correcta y presiona
      //                 "Crear plan"
      //               </span>
      //             </div>
      //           ),
      //         },
      //       ]);
      //     }
      //   }
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
    <ConversationContext.Provider
      value={{
        messages,
        setMessages,
        waitingForAnswer,
        addNewMessage,
        deleteMessages,
        nextQuestion,
        setValues
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export const useConversation = (): ConversationContextType => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
};
