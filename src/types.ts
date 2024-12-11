export interface Message {
    id_message: string;
    sender: "user" | "bot";
    text: string | JSX.Element;
    typeOfAnswer: "string" | "number" | "select_hours" | null
}
export interface ConversationContextType {
    messages: any; 
    setMessages: React.Dispatch<React.SetStateAction<any>>; 
    waitingForAnswer: boolean,
    addNewMessage: (message: Message[]) => any,
    deleteMessages: (id: string) => any,
    nextQuestion: () => any,
    setValues : React.Dispatch<React.SetStateAction<any>>
}
export interface Info {
    age: number;
    weight: number;
    height: number;
    daysOfTraining: number;
    goal: string;
    trainingTime: string;
    sex: string;
}
export interface Exercice {
    name: string;
    series: string;
    repetitions: string;
}
export interface Plan {
    day: string;
    exercises: Exercice[];
}