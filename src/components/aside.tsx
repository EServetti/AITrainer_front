import "../style/aside.css";
import { Link } from "react-router-dom";

function Aside() {
  return (
    <aside>
      <Link to="/about">Acerca de</Link>
      <ul>
        <h3>Proximamente</h3>
        <li>Guardado de planes.</li>
        <li>Seguimiento de pesos.</li>
        <li>Compartir planes.</li>
      </ul>
    </aside>
  );
}

export default Aside;
