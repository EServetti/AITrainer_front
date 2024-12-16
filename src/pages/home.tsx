import { useEffect, useRef, useState } from "react";
import dumbbell from "../assets/crossfit.png";
import userPhoto from "../assets/user.png";
import botPhoto from "../assets/crossfit.png";
import arrow from "../assets/arrow.png";
import { useConversation } from "../context/conversationContext";
import "../style/home.css";
import { Message } from "../types";
import validateInfo from "../services/validateInfo";
import ConfirmComponent from "../components/messagesComponent";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Home() {
  const {
    messages,
    waitingForAnswer,
    addNewMessage,
    deleteMessages,
    nextQuestion,
    setValues,
    setFinishedQuestions,
    handleCreate,
    setContinue,
    shouldContinue,
  } = useConversation();

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    if (endOfMessagesRef.current && chatRef.current) {
      const chat = chatRef.current;

      if (chat.scrollHeight > chat.clientHeight - 120) {
        endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Manejar el input
  const [valueInp, setValueInp] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    deleteMessages("errors");
    setValueInp(e.target.value);
  }

  function handleClick(id_message: string): any {
    validateInfo(
      id_message,
      valueInp,
      setValueInp,
      addNewMessage,
      nextQuestion,
      setValues
    );
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>,
    id_message: string
  ) {
    if (e.key === "Enter") {
      validateInfo(
        id_message,
        valueInp,
        setValueInp,
        addNewMessage,
        nextQuestion,
        setValues
      );
    }
  }

  return (
    <div className="main_home">
      {!shouldContinue ? (
        <div className="intro_home">
          <span className="message">
            <img src={botPhoto} alt="bot" />
            Hola, bienvenido a AITrainer, seré tu entrenador personal, ¿estás
            listo para comenzar a crear tu nueva rutina de entrenamiento?
          </span>
          <span className="message">
            <img src={botPhoto} alt="bot" />
            <ConfirmComponent setContinue={setContinue} />
          </span>
        </div>
      ) : (
        <div className="chat" ref={chatRef}>
          {messages.map((message: Message, index: number) => (
            <span className={`message message-${message.sender}`} key={index}>
              <img
                className="sender_img"
                src={message.sender === "bot" ? dumbbell : userPhoto}
                alt="sender_img"
              />
              {message.text}
            </span>
          ))}
          <div ref={endOfMessagesRef}></div>
          {/* barra de escritura */}

          <label htmlFor="bar" className="writing_bar">
            {(messages[messages.length - 1].typeOfAnswer &&
              messages[messages.length - 1].typeOfAnswer === "select_hours") ||
            (messages[messages.length - 2] &&
              messages[messages.length - 2].typeOfAnswer &&
              messages[messages.length - 2].typeOfAnswer === "select_hours") ? (
              <select
                name="trainingTime"
                defaultValue=""
                onChange={handleChange}
                onKeyDown={(e) =>
                  handleKeyDown(e, messages[messages.length - 1].id_message)
                }
              >
                <option value="" disabled>
                  Ingrese el tiempo de entrenamiento
                </option>
                <option value="1/2h-1h">30min a 1h</option>
                <option value="1h-3/2h">1h a 1h/30min</option>
                <option value="3/2h-2h">1h/30min a 2h</option>
                <option value="+2h">Más de 2h</option>
              </select>
            ) : (messages[messages.length - 1].typeOfAnswer &&
                messages[messages.length - 1].typeOfAnswer ===
                  "select_bodyType") ||
              (messages[messages.length - 2] &&
                messages[messages.length - 2].typeOfAnswer &&
                messages[messages.length - 2].typeOfAnswer ===
                  "select_bodyType") ? (
              <select
                name="bodyType"
                defaultValue=""
                onChange={handleChange}
                onKeyDown={(e) =>
                  handleKeyDown(e, messages[messages.length - 1].id_message)
                }
              >
                <option value="" disabled>
                  Ingresa tu tipo de cuerpo
                </option>
                <option value="mesomorfo">Mesomorfo</option>
                <option value="ectomorfo">Ectomorfo</option>
                <option value="endomorfo">Endomorfo</option>
              </select>
            ) : (
              <input
                id="bar"
                value={valueInp}
                onChange={handleChange}
                type={
                  messages[messages.length - 1].typeOfAnswer
                    ? messages[messages.length - 1].typeOfAnswer
                    : "string"
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, messages[messages.length - 1].id_message)
                }
                placeholder="Ingrese aqui la información solicitada"
                maxLength={150}
                disabled={
                  !waitingForAnswer ||
                  (messages[messages.length - 1].typeOfAnswer ===
                    "create_plan" &&
                    true)
                }
              />
            )}

            {messages[messages.length - 1].typeOfAnswer === "create_plan" ? (
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
            ) : (
              <button
                disabled={!waitingForAnswer}
                className={
                  waitingForAnswer ? "send_info_button" : "send_info_disabled"
                }
                onClick={() =>
                  handleClick(messages[messages.length - 1].id_message)
                }
              >
                <img src={arrow} alt="send" />
              </button>
            )}
          </label>
        </div>
      )}
    </div>
  );
}

export default Home;
