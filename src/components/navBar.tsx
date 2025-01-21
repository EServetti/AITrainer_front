import { Link } from "react-router-dom";
import "../style/navBar.css";
import logo from "../assets/AITrainer.png";
import { useUser } from "../context/userContext";
import userImage from "../assets/user.png";
import { useEffect, useRef, useState } from "react";
import logout from "../services/logout";

function NavBar() {
  const context = useUser();
  const photo = context?.user?.photo ? context?.user?.photo : userImage;
  const [showUserSection, setShowUserSection] = useState(false);

  function handleClick() {
    setShowUserSection(!showUserSection);
  }

  const refUserSection = useRef<HTMLTableSectionElement>(null);
  const refUserNavBar = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    function onClickOut(e: MouseEvent) {
      if (
        refUserSection.current &&
        refUserNavBar.current &&
        !refUserSection.current.contains(e.target as Node) &&
        !refUserNavBar.current.contains(e.target as Node)
      ) {
        setShowUserSection(false);
      }
    }
    if (showUserSection) {
      document.addEventListener("mousedown", onClickOut);
    } else {
      document.removeEventListener("mousedown", onClickOut);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOut);
    };
  }, [showUserSection]);

  function handleLogout() {
    logout();
  }

  return (
    <>
      {context?.user ? (
        <nav>
          <span className="logo" style={{ marginRight: "auto" }}>
            <img src={logo} alt="AITrainer" />
          </span>
          <span className="home" style={{ marginRight: "20%" }}>
            <Link to="/">Nuevo plan</Link>
          </span>
          {/* <span style={{ marginRight: "25%" }}>
            <Link to="/plans">Mis planes</Link>
          </span> */}
        </nav>
      ) : (
        <nav>
          <span className="logo" style={{ marginRight: "auto" }}>
            <img src={logo} alt="AITrainer" />
          </span>
          <span className="home">
            <Link to="/">Nuevo plan</Link>
          </span>
          <span>
            <Link to="/register">Registrarse</Link>
          </span>
          <span style={{ marginRight: "auto", whiteSpace: "nowrap" }}>
            <Link to="/login">Iniciar sesión</Link>
          </span>
        </nav>
      )}
      {context?.user && (
        <span
          style={showUserSection ? { border: "1px solid #0078D7" } : {}}
          className="user_navBar"
          ref={refUserNavBar}
        >
          <button onClick={handleClick}>
            <img src={photo} alt="user" />
          </button>
        </span>
      )}
      {showUserSection && (
        <section ref={refUserSection} className="user_section">
          <span>
            <Link to="/account">Mi cuenta</Link>
          </span>
          {/* <span style={{backgroundColor: "#F0F2F5"}}>
            <Link to="/plans">Mis planes</Link>
          </span> */}
          <span>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </span>
        </section>
      )}
    </>
  );
}

export default NavBar;
