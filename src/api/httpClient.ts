import axios from "axios";
import { getToken, removeToken, removeUsername } from "helpers/Auth";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "",
  timeout: 1000,
  headers: {
    Authorization: getToken() || "",
  },
});

client.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      removeUsername();
      removeToken();
      window.location.assign("/signin");
      throw new axios.Cancel("401: Unauthorized");
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      removeUsername();
      removeToken();
      window.location.assign("/signin");
      throw new axios.Cancel("401: Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default client;
