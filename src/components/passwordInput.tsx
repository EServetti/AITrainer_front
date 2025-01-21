import "../style/register.css";
import show from "../assets/show.png";
import hide from "../assets/hide.png";

function Password({
  showPassword,
  setShowPassword,
  first,
  className
}: {
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  first: boolean,
  className: string
}) {
  return (
    <div className={className}>
      <input
        className={first ? "first_pass" : "seccond_pass"}
        name={first ? "password" : "password_2"}
        type={showPassword ? "text" : "password"}
        placeholder={first ? "Contraseña" : "Repita la contraseña"}
      />
      {first && (
        <button
          onClick={(e) => {
            e.preventDefault()
            setShowPassword(!showPassword);
          }}
        >
          <img src={showPassword ? show : hide} />
        </button>
      )}
    </div>
  );
}

export default Password;
