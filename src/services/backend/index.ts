import axios from "axios";

export const Backend = axios.create({
  withCredentials: true,
  baseURL: "https://bus-time-web.herokuapp.com/api",
});
