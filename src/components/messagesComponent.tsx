import { useState } from "react";
import { useUser } from "../context/userContext";

function ConfirmComponent({
  setContext,
  setContinue,
  setQuickContinue
}: {
  setContext: React.Dispatch<React.SetStateAction<string>>,
  setContinue: React.Dispatch<React.SetStateAction<boolean>>,
  setQuickContinue: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const [errors, setErrors] = useState("")

  const context = useUser()

  function handleClick() {
    setContext("normal");
    setContinue(true)
    setQuickContinue(true)
  }

  function handleQuickCreation() {
    if (!context?.user) {
      setErrors("Necesitas iniciar sesión.")
    } else if (!context.user.planData) {
      setErrors("Debes cargar info extra.")
    } else {
      setContext("quick")
      setContinue(true)
      setQuickContinue(true)
    }
  }

  return (
    <span style={{display: "flex", gap: "15px", paddingLeft: "5px"}}>
      <button className="user_button" onClick={handleClick}>
        ¡Empecemos!
      </button>
      <button onClick={handleQuickCreation} className="user_button">Creación rapida</button>
      {errors && <div className="errors">{errors}</div>}
    </span>
  );
}

export default ConfirmComponent;
