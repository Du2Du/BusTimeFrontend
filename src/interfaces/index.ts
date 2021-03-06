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

export interface UserDataProps {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  cpf: string;
  isAdmin: boolean;
}

interface SortProps {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
interface PageableProps {
  sort: SortProps;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}
export interface PaginationInterface<T> {
  content: Array<T>;
  pageable: PageableProps;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: SortProps;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
