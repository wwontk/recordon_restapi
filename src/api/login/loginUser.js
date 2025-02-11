import axios from "axios";

export const loginUser = (data) => {
  return axios.post(`${import.meta.env.VITE_APP_LOGIN_SERVER}/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
