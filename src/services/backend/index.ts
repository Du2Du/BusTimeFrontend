import axios from "axios";
import { appUrl } from "../../utils";

export const Backend = axios.create({
  withCredentials: true,
  baseURL: appUrl,
});
