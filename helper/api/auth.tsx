import axios, { AxiosError } from "axios";
import { LoginUserType, RegisterUserType } from "@/types/userType";
import { FieldValues } from "react-hook-form";

const RegisterApi = async (data: RegisterUserType) => {
  try {
    const register = await axios.post("/api/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return register;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      console.log("err1", error.response.data);
      console.log("err2", error.response.status);
      console.log("err3", error.response.headers);
    } else if (error.request) {
      console.log("err4", error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log("err5", error.config);
  }
};

const LoginApi = async (data: LoginUserType) => {
  try {
    const login = await axios.post("/api/auth/login", data, {
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

export { RegisterApi, LoginApi };
