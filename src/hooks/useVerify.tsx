import axios from "axios";
import { useEffect, useState } from "react";
import { path } from "../path";

function useVerify(email: string, verifyCode: string) {
  const [message, setMessage] = useState<{
    statusCode: number;
    message: string;
  }>({
    statusCode: 0,
    message: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(`${path}/verify/${email}/${verifyCode}`, {
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        setMessage(response);
        setLoading(false);
      });
  }, []);

  return { message, loading };
}

export default useVerify;
