import { useEffect, useRef } from "react";
import dumbbell from "../assets/crossfit.png";
import userPhoto from "../assets/user.png"


export interface Message {
    id_message: string,
    sender: 'user' | 'bot';
    text: string | JSX.Element;
  }


function useChat(messages: Message[]) {

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

export default useChat