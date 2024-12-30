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
  // const [shownIntro, setShownIntro] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id_message: "intro",
      sender: "bot",
      text: "Ok, para poder crear un plan personalizado para ti necesitaré que respondas las siguientes preguntas:",
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
    extra: "",
    bodyType: "",
    dificulty: "",
  });

  const [waitingForAnswer, setWaitingForAnswer] = useState(false);
  const [index, setIndex] = useState(0);

  const [finishedQuestions, setFinishedQuestions] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");

  // funcion para dejar de esperar por la respuesta del usuario
  async function nextQuestion() {
    await sleep(1000);
    setWaitingForAnswer(false);
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
      id_message: "dificultad_bot",
      sender: "bot",
      text: <div>¿Que dificultad te gustaria para tu plan (fácil, medio, difícil)?</div>,
      typeOfAnswer: "string"
    },
    {
      id_message: "bodyType_bot",
      sender: "bot",
      text: <div>¿Cuál es tu tipo de cuerpo?</div>,
      typeOfAnswer: "select_bodyType",
    },
    {
      id_message: "dias_bot",
      sender: "bot",
      text: <div>¿Cuántos días tienes pensado entrenar?</div>,
      typeOfAnswer: "number",
    },
    {
      id_message: "horas_bot",
      sender: "bot",
      text: (
        <div>
          ¿Cuánto tiempo quieres dedicar a cada sesión de entrenamiento?
        </div>
      ),
      typeOfAnswer: "select_hours",
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
    {
      id_message: "extra_bot",
      sender: "bot",
      text: (
        <div>
          ¿Hay alguna información extra que pueda usar para crear un mejor plan?
        </div>
      ),
      typeOfAnswer: "string",
    },
    {
      id_message: "create",
      sender: "bot",
      text: "¡Ok, con esta información estoy listo para crear tu plan!",
      typeOfAnswer: "create_plan",
    },
  ];

  useEffect(() => {
    async function sendMessages() {
      await sleep(1000);
      // hace las preguntas necesarias para conseguir la informacion
      if (
        shouldContinue == true &&
        index < messagesToSend.length &&
        waitingForAnswer == false
      ) {
        addNewMessage([messagesToSend[index]]);
        setIndex(index + 1);
        await sleep(500);
        setWaitingForAnswer(true);
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
              text: <span className="errors">{errorInfo}</span>,
              typeOfAnswer: null,
            },
          ]);
        }
      }
    }
    sendMessages();
  }, [
    shouldContinue,
    waitingForAnswer,
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
        setValues,
        setFinishedQuestions,
        handleCreate,
        setContinue,
        shouldContinue
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}


export function useConversation() {
    const context = useContext(ConversationContext)
    return context
}