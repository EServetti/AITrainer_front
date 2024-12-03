import { Routes, Route } from "react-router-dom"
import Home from "../pages/home"
import "../style/main.css"
import About from "../pages/about"

function Main() {
    return (
        <div className="main">
        <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/about" Component={About}/>
        </Routes>
        </div>
    )
}

export default Main