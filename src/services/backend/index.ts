import axios from "axios";

export const Backend = axios.create({
  baseURL: "http://localhost:8080/api",
});
