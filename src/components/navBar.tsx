import { Link } from "react-router-dom"
import "../style/navBar.css"
import logo from "../assets/AITrainer.png"

function NavBar() {
    return (
        <nav>
            <span className="logo"><img src={logo} alt="AITrainer" /></span>
            <span className="home"><Link to="/">Nuevo plan</Link></span>
            <span><Link to="/register">Registrarse</Link></span>
            <span className="about"><Link to="/about">Acerca de</Link></span>
        </nav>
    )
}

export default NavBar