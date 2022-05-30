import { number } from "yup";

export type BootstrapColors =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

export interface BusProps {
  id: number;
  line: string;
  hour: string;
  ticketPrice: number;
  inicialRoute: string;
  finalRoute: string;
  busNumber: number;
  idUserAdmin: number;
}
