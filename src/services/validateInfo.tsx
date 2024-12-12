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
  setValues: React.Dispatch<React.SetStateAction<any>>,
) {
  switch (id_question) {
    case "años_bot":
      if (value <= 14 || value >= 70) {
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
            text: `${value}`,
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
      break;
    case "peso_bot":
      if (value < 20 || value > 250) {
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
      if (value < 60 || value > 260) {
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
    case "dias_bot":
      if (value < 1 || value > 7) {
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
  }
}

export default validateInfo;
