import { useState } from "react";
import { Message } from "../hooks/useChat";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copy from "../assets/copy.png";

interface Exercice {
  name: string;
  series: string;
  repetitions: string;
}

interface Plan {
  day: string;
  exercises: Exercice[];
}

function PlanContainer({ plans }: { plans: Plan[] }) {
  const [copied, setCopied] = useState(false);

  // funcion para manejar el boton de copiado
  function handleCopy() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // pasa el plan a texto para que el usuario lo copie
  function formatPlanText(plans: Plan[]) {
    let planText = "";

    plans.forEach((plan) => {
      planText += `\n${plan.day}\n`;

      plan.exercises.forEach((exercise) => {
        planText += `- ${exercise.name}: ${exercise.series}, ${exercise.repetitions}\n`; // Agregar cada ejercicio
      });
      planText += "\n";
    });

    return planText.trim();
  }

  const planText = formatPlanText(plans);

  return (
    <div className="plans_container">
      <CopyToClipboard text={planText} onCopy={handleCopy}>
        <button className="copy">
          {copied ? "¡Copiado!" : <img src={copy} alt="Copiar" />}
        </button>
      </CopyToClipboard>
      {plans.map((plan_day, index) => (
        <div key={index} className="plan">
          <span className="plan_day">{plan_day.day}</span>
          <section className="exercises">
            {plan_day.exercises.map((exercise, index) => (
              <div key={index} className="exercise">
                <span>{exercise.name}:</span>
                <span> {exercise.series} </span>
                <span> de {exercise.repetitions} </span>
              </div>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
}

function returnPlan(
  plans: Plan[],
  addNewMessage: (messages: Message[]) => any
) {
  // console.log(plans);

  addNewMessage([
    {
      id_message: "plans",
      sender: "bot",
      text: <PlanContainer plans={plans} />,
    },
  ]);
}

export default returnPlan;
