import Main from "./components/body";
import NavBar from "./components/navBar";
import { ConversationProvider } from "./context/conversationContext";

function App() {
  return (
    <ConversationProvider>
      <NavBar />
      <Main />
    </ConversationProvider>
  );
}

export default App;
