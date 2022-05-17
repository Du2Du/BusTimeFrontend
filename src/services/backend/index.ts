import axios from "axios";

export const Backend = axios.create({
  baseURL: "https://bus-time-web.herokuapp.com/api/",
});
