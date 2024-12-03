import { Routes, Route } from "react-router-dom"
import Home from "../pages/home"
import "../style/main.css"

function Main() {
    return (
        <div className="main">
        <Routes>
            <Route path="/" Component={Home}/>
        </Routes>
        </div>
    )
}

export default Main