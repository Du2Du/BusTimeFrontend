import axios from "axios";

export const Backend = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
