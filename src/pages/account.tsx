import { useUser } from "../context/userContext";
import "../style/account.css";

function Account() {
  const context = useUser();

  return (
    <div className="main_account">
      <section className="user_info">
        <span className="image_info">
          <span>
            <div>
              {context?.user?.first_name} {context?.user?.last_name}
            </div>
            {context?.user?.email}
          </span>
          <button>
            <img src={context?.user?.photo} alt="user" />
            <span className="tooltip">Cambiar foto</span>
          </button>
        </span>
        <form></form>
      </section>
    </div>
  );
}

export default Account;
