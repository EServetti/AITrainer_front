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
import { useUser } from "../context/userContext";
import { useQuickCreation } from "../context/quickCreationContext";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Home() {
  const [conversationContext, setConversationContext] = useState("");

  const normalConversation = useConversation();
  const quickConversation = useQuickCreation();

  const context = useUser();

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
  }, [normalConversation.messages, quickConversation.messages]);

  // Manejar el input
  const [valueInp, setValueInp] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (conversationContext === "normal") {
      normalConversation.deleteMessages("errors");
    } else {
      quickConversation.deleteMessages("errors");
    }
    setValueInp(e.target.value);
  }

  function handleClick(id_message: string): any {
    validateInfo(
      id_message,
      valueInp,
      setValueInp,
      conversationContext === "normal"
        ? normalConversation.addNewMessage
        : quickConversation.addNewMessage,
      conversationContext === "normal"
        ? normalConversation.nextQuestion
        : quickConversation.nextQuestion,
      conversationContext === "normal"
        ? normalConversation.setValues
        : quickConversation.setValues
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
        conversationContext === "normal"
          ? normalConversation.addNewMessage
          : quickConversation.addNewMessage,
        conversationContext === "normal"
          ? normalConversation.nextQuestion
          : quickConversation.nextQuestion,
        conversationContext === "normal"
          ? normalConversation.setValues
          : quickConversation.setValues
      );
    }
  }

  return (
    <div className="main_home">
      {!normalConversation.shouldContinue &&
      !quickConversation.shouldContinue ? (
        <div className="intro_home">
          <span className="message">
            <img src={botPhoto} alt="bot" />
            Hola, bienvenido a AITrainer, seré tu entrenador personal, ¿estás
            listo para comenzar a crear tu nueva rutina de entrenamiento?
          </span>
          <span className="message">
            <img src={botPhoto} alt="bot" />
            <ConfirmComponent setContext={setConversationContext} setContinue={normalConversation.setContinue} setQuickContinue={quickConversation.setContinue} />
          </span>
        </div>
      ) : (
        <div className="chat" ref={chatRef}>
          {conversationContext === "normal"
            ? normalConversation.messages.map(
                (message: Message, index: number) => (
                  <span
                    className={`message message-${message.sender}`}
                    key={index}
                  >
                    <img
                      className="sender_img"
                      src={
                        message.sender === "bot"
                          ? dumbbell
                          : context?.user?.photo
                          ? context?.user?.photo
                          : userPhoto
                      }
                      alt="sender_img"
                    />
                    {message.text}
                  </span>
                )
              )
            : quickConversation.messages.map(
                (message: Message, index: number) => (
                  <span
                    className={`message message-${message.sender}`}
                    key={index}
                  >
                    <img
                      className="sender_img"
                      src={
                        message.sender === "bot"
                          ? dumbbell
                          : context?.user?.photo
                          ? context?.user?.photo
                          : userPhoto
                      }
                      alt="sender_img"
                    />
                    {message.text}
                  </span>
                )
              )}
          <div ref={endOfMessagesRef}></div>
          {/* barra de escritura */}
          {conversationContext === "normal" ? (
            <label htmlFor="bar" className="writing_bar">
            {(normalConversation.messages[normalConversation.messages.length - 1].typeOfAnswer &&
              normalConversation.messages[normalConversation.messages.length - 1].typeOfAnswer === "select_hours") ||
            (normalConversation.messages[normalConversation.messages.length - 2] &&
              normalConversation.messages[normalConversation.messages.length - 2].typeOfAnswer &&
              normalConversation.messages[normalConversation.messages.length - 2].typeOfAnswer === "select_hours") ? (
              <select
                name="trainingTime"
                defaultValue=""
                onChange={handleChange}
              >
                <option value="" disabled>
                  Ingrese el tiempo de entrenamiento
                </option>
                <option value="1/2h-1h">30min a 1h</option>
                <option value="1h-3/2h">1h a 1h/30min</option>
                <option value="3/2h-2h">1h/30min a 2h</option>
                <option value="+2h">Más de 2h</option>
              </select>
            ) : (normalConversation.messages[normalConversation.messages.length - 1].typeOfAnswer &&
              normalConversation.messages[normalConversation.messages.length - 1].typeOfAnswer ===
                  "select_bodyType") ||
              (normalConversation.messages[normalConversation.messages.length - 2] &&
                normalConversation.messages[normalConversation.messages.length - 2].typeOfAnswer &&
                normalConversation.messages[normalConversation.messages.length - 2].typeOfAnswer ===
                  "select_bodyType") ? (
              <select name="bodyType" defaultValue="" onChange={handleChange}>
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
                  normalConversation.messages[normalConversation.messages.length - 1].typeOfAnswer
                    ? normalConversation.messages[normalConversation.messages.length - 1].typeOfAnswer
                    : "string"
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, normalConversation.messages[normalConversation.messages.length - 1].id_message)
                }
                placeholder="Ingrese aqui la información solicitada"
                maxLength={150}
                disabled={
                  !normalConversation.waitingForAnswer ||
                  (normalConversation.messages[normalConversation.messages.length - 1].typeOfAnswer ===
                    "create_plan" &&
                    true)
                }
              />
            )}

            {normalConversation.messages[normalConversation.messages.length - 1].typeOfAnswer === "create_plan" ? (
              <button
                className="user_button"
                onClick={async () => {
                  normalConversation.setFinishedQuestions(true);
                  // envia la info al servidor
                  normalConversation.handleCreate();
                }}
              >
                Crear plan
              </button>
            ) : (
              <button
                disabled={!normalConversation.waitingForAnswer}
                className={
                  normalConversation.waitingForAnswer ? "send_info_button" : "send_info_disabled"
                }
                onClick={() =>
                  handleClick(normalConversation.messages[normalConversation.messages.length - 1].id_message)
                }
              >
                <img src={arrow} alt="send" />
              </button>
            )}
          </label>
          ) : (
            <label htmlFor="bar" className="writing_bar">
            {(quickConversation.messages[quickConversation.messages.length - 1].typeOfAnswer &&
              quickConversation.messages[quickConversation.messages.length - 1].typeOfAnswer === "select_hours") ||
            (quickConversation.messages[quickConversation.messages.length - 2] &&
              quickConversation.messages[quickConversation.messages.length - 2].typeOfAnswer &&
              quickConversation.messages[quickConversation.messages.length - 2].typeOfAnswer === "select_hours") ? (
              <select
                name="trainingTime"
                defaultValue=""
                onChange={handleChange}
              >
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
                  quickConversation.messages[quickConversation.messages.length - 1].typeOfAnswer
                    ? quickConversation.messages[quickConversation.messages.length - 1].typeOfAnswer
                    : "string"
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, quickConversation.messages[quickConversation.messages.length - 1].id_message)
                }
                placeholder="Ingrese aqui la información solicitada"
                maxLength={150}
                disabled={
                  !quickConversation.waitingForAnswer ||
                  (quickConversation.messages[quickConversation.messages.length - 1].typeOfAnswer ===
                    "create_plan" &&
                    true)
                }
              />
            )}

            {quickConversation.messages[quickConversation.messages.length - 1].typeOfAnswer === "create_plan" ? (
              <button
                className="user_button"
                onClick={async () => {
                  quickConversation.setFinishedQuestions(true);
                  // envia la info al servidor
                  quickConversation.handleCreate();
                }}
              >
                Crear plan
              </button>
            ) : (
              <button
                disabled={!quickConversation.waitingForAnswer}
                className={
                  quickConversation.waitingForAnswer ? "send_info_button" : "send_info_disabled"
                }
                onClick={() =>
                  handleClick(quickConversation.messages[quickConversation.messages.length - 1].id_message)
                }
              >
                <img src={arrow} alt="send" />
              </button>
            )}
          </label>
          )}
          
        </div>
      )}
    </div>
  );
}

export default Home;
