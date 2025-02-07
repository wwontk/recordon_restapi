import axios from "axios";

export const loginUser = (data) => {
  return axios.post(
    `${import.meta.env.VITE_APP_PUBLIC_SERVER}/users/login`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
