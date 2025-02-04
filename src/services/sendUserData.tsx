import axios from "axios";
import { User_data } from "../types";
import { path } from "../path";

function sendData(
  user_id: number | undefined,
  data: User_data,
  hasData: boolean | undefined,
  setErrors: React.Dispatch<React.SetStateAction<string>>
) {
  if (
    !hasData &&
    (!data?.weight ||
      !data.height ||
      !data.goal ||
      !data.difficulty ||
      !data.bodyType)
  ) {
    setErrors("Porfavor ingrese todos los datos");
  } else if (!hasData) {
    if (data.date_of_birth) {
      axios
        .put(
          `${path}/bithDate`,
          { id: user_id, date_of_birth: data.date_of_birth },
          { withCredentials: true }
        )
        .then((res) => {
          setErrors("");
          const response = res.data;
          if (response.statusCode !== 200) {
            setErrors(response.message);
          }
        });
    }
    axios
      .post(
        `${path}/userdata`,
        {
          user_id,
          weight: data.weight,
          height: data.height,
          goal: data.goal,
          bodyType: data.bodyType,
          difficulty: data.difficulty,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setErrors("");
        const response = res.data;
        if (response.statusCode !== 201) {
          setErrors(response.message);
        } else {
          location.reload();
        }
      });
  } else if (
    !data.date_of_birth &&
    !data?.weight &&
    !data.height &&
    !data.goal &&
    !data.difficulty &&
    !data.bodyType
  ) {
    setErrors("Ingrese un valor a actualizar");
  } else {
    setErrors("");
    if (data.date_of_birth) {
      axios
        .put(
          `${path}/bithDate`,
          { id: user_id, date_of_birth: data.date_of_birth },
          { withCredentials: true }
        )
        .then((res) => {
          setErrors("");
          const response = res.data;
          if (response.statusCode !== 200) {
            setErrors(response.message);
          }
        });
    }
    const { weight, height, bodyType, goal, difficulty } = data;
    // crear un objeto con solo las propiedades que tienen valores válidos
    const filteredData = Object.fromEntries(
      Object.entries({
        user_id,
        weight,
        height,
        bodyType,
        goal,
        difficulty,
      }).filter(([_, value]) => value !== null && value !== undefined)
    );

    axios
      .put(`${path}/updateuserdata`, filteredData, { withCredentials: true })
      .then((res) => {
        setErrors("");
        const response = res.data;
        if (response.statusCode !== 200) {
          setErrors(response.message);
        } else {
          location.reload();
        }
      });
  }
}

export default sendData;
