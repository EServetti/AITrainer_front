import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import "../style/main.css";
import About from "../pages/about";
import Aside from "./aside";
import { useEffect, useState } from "react";
import Register from "../pages/register";
import Login from "../pages/login";
import Account from "../pages/account";

function Main() {
  const [displayAside, setDisplayAside] = useState(true);

  useEffect(() => {
    function adjustWindow() {
      const width = window.innerWidth;

      if (width < 1000) {
        setDisplayAside(false)
      } else {
        setDisplayAside(true)
      }
    }
    adjustWindow()
    
    window.addEventListener("resize", adjustWindow)

    return () => {
        window.removeEventListener("resize", adjustWindow)
    }
  }, []);

  return (
    <div className="main">
      {displayAside && <Aside />}
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/register" Component={Register}/>
        <Route path="/login" Component={Login}/>
        <Route path="/account" Component={Account}/>
      </Routes>
    </div>
  );
}

export default Main;
