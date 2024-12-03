import Main from "./components/body";
import NavBar from "./components/navBar";
import { ConversationProvider } from "./context/conversationContext";
import "./App.css"

function App() {
  return (
    <div className="main_container">
    <ConversationProvider>
      <NavBar />
      <Main />
    </ConversationProvider>
    </div>
  );
}

export default App;
