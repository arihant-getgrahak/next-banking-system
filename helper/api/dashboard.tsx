import axios, { AxiosError } from "axios";

const DashboardApi = async (data: any) => {
  try {
    const dashboard = await axios.get(`/api/dashboard/${data}`);
    return dashboard;
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

const TransactionApi = async (data: any) => {
  
  try {
    const transaction = await axios.get(`/api/transaction/${data}`);
    return transaction;
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
export { DashboardApi, TransactionApi };
