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
import { ConversationContextType } from "../types";
import { useUser } from "./userContext";

const QuickCreationContext = createContext<ConversationContextType | undefined>(
  undefined
);

interface QuickCreationProviderProps {
  children: ReactNode;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function QuickCreationProvider({
  children,
}: QuickCreationProviderProps) {
  const context = useUser();

  const [shouldContinue, setContinue] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id_message: "intro",
      sender: "bot",
      text: "Ok, solo necesito unos datos más:",
      typeOfAnswer: null,
    },
  ]);

  const [values, setValues] = useState<any>({
    daysOfTraining: 0 || null,
    trainingTime: "",
    extra: "",
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

  // Calcular la edad del user
  function calculateAge(dateOfBirth: string | Date): number {

    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    return hasBirthdayPassed ? age : age - 1;
  }

  // crea el plan con la info del user
  async function handleCreate() {
    await createPlan(
      "quick",
      valuesRef.current,
      setErrorInfo,
      addNewMessage,
      deleteMessages,
      {
        age: calculateAge(context?.user?.date_of_birth as string) || null,
        weight: (context?.user?.planData?.weight as number) || null,
        height: (context?.user?.planData?.height as number) || null,
        goal: (context?.user?.planData?.goal as string) || null,
        sex: (context?.user?.sex as string) || null,
        bodyType: (context?.user?.planData?.bodyType as string) || null,
        difficulty: (context?.user?.planData?.difficulty as string) || null,
      },
    );
  }

  // MENSAJES
  const messagesToSend: Message[] = [
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
  }, [shouldContinue, waitingForAnswer, finishedQuestions, errorInfo]);

  return (
    <QuickCreationContext.Provider
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
        shouldContinue,
      }}
    >
      {children}
    </QuickCreationContext.Provider>
  );
}

export function useQuickCreation(): ConversationContextType {
  const context = useContext(QuickCreationContext);
  return context as ConversationContextType;
}
