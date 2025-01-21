import { Message } from "../types";

function normalizeString(input: string) {
  const lowerCase = input.toLowerCase();

  const normalized = lowerCase
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");

  return normalized;
}

function validateInfo(
  id_question: string,
  value: string | number,
  setValueInp: React.Dispatch<React.SetStateAction<any>>,
  addNewMessage: (message: Message[]) => any,
  nextQuestion: () => any,
  setValues: React.Dispatch<React.SetStateAction<any>>
) {
  switch (id_question) {
    case "años_bot":
      const age = Number(value);
      if (age <= 14 || age >= 70) {
        addNewMessage([
          {
            id_message: "errors",
            sender: "bot",
            text: (
              <div className="errors">
                Debes tener entre 15 y 70 años para crear un plan.
              </div>
            ),
            typeOfAnswer: null,
          },
        ]);
      } else {
        addNewMessage([
          {
            id_message: "años_user",
            sender: "user",
            text: `${value}`,
            typeOfAnswer: null,
          },
        ]);
        setValues((prevState: any) => ({
          ...prevState,
          age: value,
        }));
        setValueInp("");
        nextQuestion();
      }
      break;
    case "sexo_bot":
      if (typeof value === "string") {
        const newValue = normalizeString(value);
        if (
          newValue === "masculino" ||
          newValue === "femenino" ||
          newValue === "x"
        ) {
          addNewMessage([
            {
              id_message: "sexo_user",
              sender: "user",
              text: `${newValue}`,
              typeOfAnswer: null,
            },
          ]);
          setValues((prevState: any) => ({
            ...prevState,
            sex: value,
          }));
          setValueInp("");
          nextQuestion();
        } else {
          addNewMessage([
            {
              id_message: "errors",
              sender: "bot",
              text: (
                <div className="errors">
                  Por favor elige entre "masculino", "femenino" o "x"
                </div>
              ),
              typeOfAnswer: null,
            },
          ]);
        }
      }
      break;
    case "peso_bot":
      const weight = Number(value);
      if (weight < 20 || weight > 250) {
        addNewMessage([
          {
            id_message: "errors",
            sender: "bot",
            text: (
              <div className="errors">
                El peso debe estar entre 20kg y 250kg.
              </div>
            ),
            typeOfAnswer: null,
          },
        ]);
      } else {
        addNewMessage([
          {
            id_message: "peso_user",
            sender: "user",
            text: `${value}kg`,
            typeOfAnswer: null,
          },
        ]);
        setValues((prevState: any) => ({
          ...prevState,
          weight: value,
        }));
        setValueInp("");
        nextQuestion();
      }
      break;
    case "altura_bot":
      const height = Number(value);
      if (height < 60 || height > 260) {
        addNewMessage([
          {
            id_message: "errors",
            sender: "bot",
            text: (
              <div className="errors">
                La altura debe estar entre 60cm y 260cm.
              </div>
            ),
            typeOfAnswer: null,
          },
        ]);
      } else {
        addNewMessage([
          {
            id_message: "altura_user",
            sender: "user",
            text: `${value}cm`,
            typeOfAnswer: null,
          },
        ]);
        setValues((prevState: any) => ({
          ...prevState,
          height: value,
        }));
        setValueInp("");
        nextQuestion();
      }
      break;
    case "dificultad_bot":
      if (typeof value === "string") {
        const newValue = normalizeString(value);
        if (
          newValue === "facil" ||
          newValue === "medio" ||
          newValue === "dificil"
        ) {
          addNewMessage([
            {
              id_message: "dificultad_user",
              sender: "user",
              text: `${newValue}`,
              typeOfAnswer: null,
            },
          ]);
          setValues((prevState: any) => ({
            ...prevState,
            difficulty: value,
          }));
          setValueInp("");
          nextQuestion();
        } else {
          addNewMessage([
            {
              id_message: "errors",
              sender: "bot",
              text: (
                <div className="errors">
                  Por favor elige entre "fácil", "medio", "difícil"
                </div>
              ),
              typeOfAnswer: null,
            },
          ]);
        }
      }
      break;
    case "bodyType_bot":
      if (value === "") {
        addNewMessage([
          {
            id_message: "errors",
            sender: "bot",
            text: (
              <div className="errors">
                Por favor selecciona tu tipo de cuerpo.
              </div>
            ),
            typeOfAnswer: null,
          },
        ]);
      } else {
        addNewMessage([
          {
            id_message: "bodyType_user",
            sender: "user",
            text: `${value}`,
            typeOfAnswer: null,
          },
        ]);
        setValues((prevState: any) => ({
          ...prevState,
          bodyType: value,
        }));
        setValueInp("");
        nextQuestion();
      }
      break;
    case "dias_bot":
      const days = Number(value);
      if (days < 1 || days > 7) {
        addNewMessage([
          {
            id_message: "errors",
            sender: "bot",
            text: (
              <div className="errors">Debes entrenar entre 1 a 7 dias.</div>
            ),
            typeOfAnswer: null,
          },
        ]);
      } else {
        addNewMessage([
          {
            id_message: "dias_user",
            sender: "user",
            text: `${value}`,
            typeOfAnswer: null,
          },
        ]);
        setValues((prevState: any) => ({
          ...prevState,
          daysOfTraining: value,
        }));
        setValueInp("");
        nextQuestion();
      }
      break;
    case "horas_bot":
      if (value === "") {
        addNewMessage([
          {
            id_message: "errors",
            sender: "bot",
            text: (
              <div className="errors">
                Por favor selecciona las horas a entrenar.
              </div>
            ),
            typeOfAnswer: null,
          },
        ]);
      } else {
        addNewMessage([
          {
            id_message: "horas_user",
            sender: "user",
            text: `${value}`,
            typeOfAnswer: null,
          },
        ]);
        setValues((prevState: any) => ({
          ...prevState,
          trainingTime: value,
        }));
        setValueInp("");
        nextQuestion();
      }
      break;
    case "obj_bot":
      if (value === "") {
        addNewMessage([
          {
            id_message: "errors",
            sender: "bot",
            text: (
              <div className="errors">
                Por favor ingresa al menos un objetivo corporal.
              </div>
            ),
            typeOfAnswer: null,
          },
        ]);
      } else {
        addNewMessage([
          {
            id_message: "horas_user",
            sender: "user",
            text: `${value}`,
            typeOfAnswer: null,
          },
        ]);
        setValues((prevState: any) => ({
          ...prevState,
          goal: value,
        }));
        setValueInp("");
        nextQuestion();
      }
      break;
    case "extra_bot":
      if (value === "") {
        addNewMessage([
          {
            id_message: "extra_user",
            sender: "user",
            text: `Ninguna info extra`,
            typeOfAnswer: null,
          },
        ]);
        nextQuestion();
        break;
      }
      addNewMessage([
        {
          id_message: "extra_user",
          sender: "user",
          text: `${value}`,
          typeOfAnswer: null,
        },
      ]);
      setValues((prevState: any) => ({
        ...prevState,
        extra: value,
      }));
      setValueInp("");
      nextQuestion();
      break;
  }
}

export default validateInfo;
