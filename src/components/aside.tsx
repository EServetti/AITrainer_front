import "../style/aside.css";
import { Link } from "react-router-dom";

function Aside() {
  return (
    <aside>
      <span>
        <Link to="/about">Acerca de</Link>
      </span>
    </aside>
  );
}

export default Aside;
