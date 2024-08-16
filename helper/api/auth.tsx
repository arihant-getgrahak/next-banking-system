import axios, { AxiosError } from "axios";
import { LoginUserType, RegisterUserType } from "@/types/userType";

const register = async (data: RegisterUserType) => {
  try {
    const register = await axios.post("/api/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return register;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};

const login = async (data: LoginUserType) => {
  try {
    const login = await axios.post("/api/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return login;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};

export { register, login };
