import axios from "axios";

export const Backend = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8090/api',
});
