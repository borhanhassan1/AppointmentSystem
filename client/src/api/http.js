import axios from "axios";
import { toast } from "react-toastify";
import authApi from "./auth";

axios.interceptors.response.use(null, (err) => {
  if (!err.response?.data.message) {
    toast.error("Unexpected error occured, please try again later");
    return Promise.reject(err);
  }

  return Promise.reject(err);
});

const token = authApi.getToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}

const http = axios;
export default http;
