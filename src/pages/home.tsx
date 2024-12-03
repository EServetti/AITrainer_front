import { useEffect, useRef } from "react";
import dumbbell from "../assets/crossfit.png";
import userPhoto from "../assets/user.png";
import { useConversation } from "../context/conversationContext";
import "../style/home.css"

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




export interface Message {
    id_message: string,
    sender: 'user' | 'bot';
    text: string | JSX.Element;
  }


function Home() {

    const {messages} = useConversation()
    const endOfMessagesRef = useRef<HTMLDivElement>(null)

    function scrollToBottom() {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({behavior: "smooth"})
        }
    }

    useEffect(() => {
        scrollToBottom()
    },[messages])
    
    return (
        <div className="chat">
            {messages.map((message:Message, index:number) => (
                <span className={`message message-${message.sender}`} key={index}>
                    <img className="sender_img" src={message.sender === "bot" ? dumbbell : userPhoto} alt="sender_img" />
                    {message.text}
                </span>
            ))}
            <div ref={endOfMessagesRef}></div>
        </div>
    )
}


export default Home;
