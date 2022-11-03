import { ReactNode } from "react";
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

export interface LineBusProps{
  id: number;
  lineName: string;
}
export interface BusProps {
  id: number;
  lineBus: LineBusProps;
  hour: string;
  ticketPrice: number;
  inicialRoute: string;
  finalRoute: string;
  busNumber: number;
  idUserAdmin: number;
}

export type PermissionsType =
  | "DEFAULT"
  | "ADMINISTRATOR"
  | "SUPER_ADMINISTRATOR";

export interface Permission {
  id: number;
  permissionName: string;
  permissionId: string;
}
export interface PermissionsGroup {
  id: number;
  name: PermissionsType;
  permissionList: Array<Permission>;
}
export interface UserDataProps {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  favoriteBus: Array<BusProps>;
  permissionsGroup?: PermissionsGroup;
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

export interface PermissionGroupInterface {
  id: number;
  name: string;
  permissionList: Array<PermissionInterface>;
}

interface PermissionInterface {
  id: number;
  permissionName: string;
  permissionId: string;
}

export type MethodTypes = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

enum UrlStatus {
  SUCCESS = "Sucesso",
  FAILURE = "Falha",
}

export interface LogsProps {
  id: number;
  time: Date;
  urlStatus: UrlStatus;
  method: MethodTypes;
  url: string;
  userForm: string | null;
}

export interface ColumnsProps<T> {
  name: string;
  label: string;
  renderColumn?: (values: T) => React.ReactNode;
  size: number;
}
export interface TableParams<T> {
  headerTitle: string;
  columns: Array<ColumnsProps<T>>;
  renderExtraHeaderComponent?: ReactNode;
  showPagination?: boolean;
  reloadItens?: (page: number) => void;
  paginationData?: PaginationInterface<any>;
  values: Array<T>;
  showTotal?: boolean;
}

export interface MenusProps{
  id: number;
  url: string;
  iconName: string;
  menuName: string;
}