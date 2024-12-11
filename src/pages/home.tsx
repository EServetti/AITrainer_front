import { useEffect, useRef, useState } from "react";
import dumbbell from "../assets/crossfit.png";
import userPhoto from "../assets/user.png";
import arrow from "../assets/arrow.png";
import { useConversation } from "../context/conversationContext";
import "../style/home.css";
import { Message } from "../types";
import validateInfo from "../services/validateInfo";

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

  return (
    <div className="main_home">
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
          (messages[messages.length - 2].typeOfAnswer &&
            messages[messages.length - 2].typeOfAnswer === "select_hours") ? (
            <select name="trainingTime" defaultValue="" onChange={handleChange}>
              <option value="" disabled>
                Ingrese el tiempo de entrenamiento
              </option>
              <option value="1/2h-1h">30min a 1h</option>
              <option value="1h-3/2h">1h a 1h/30min</option>
              <option value="3/2h-2h">1h/30min a 2h</option>
              <option value="+2h">Más de 2h</option>
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
              placeholder="Ingrese aqui la información solicitada"
              maxLength={150}
              disabled={!waitingForAnswer}
            />
          )}

          <button
            disabled={!waitingForAnswer}
            className={
              waitingForAnswer ? "send_info_button" : "send_info_disabled"
            }
            onClick={() => {
              validateInfo(
                messages[messages.length - 1].id_message,
                valueInp,
                setValueInp,
                addNewMessage,
                nextQuestion,
                setValues
              );
            }}
          >
            <img src={arrow} alt="send" />
          </button>
        </label>
      </div>
    </div>
  );
}

export default Home;
