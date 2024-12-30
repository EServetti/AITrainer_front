import Main from "./components/body";
import NavBar from "./components/navBar";
import { ConversationProvider } from "./context/conversationContext";
import "./App.css";
import { UserProvider, useUser } from "./context/userContext";
import { useEffect } from "react";
import axios from "axios";
import { path } from "./path";

function AppContent() {
  const context = useUser()
  useEffect(() => {

    async function userData() {
      axios.post(`${path}/data`, undefined, { withCredentials: true }).then((res) => {
        const response = res.data;
        if (response.statusCode !== 200) {
          context?.setLoading(false)
        } else {
          context?.setUser(response.message)
          context?.setLoading(false)
        }
      });
    }
    userData()
  }, [context?.change]);

  return (
    <div className="main_container">
        <ConversationProvider>
          <NavBar />
          <Main />
        </ConversationProvider>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
