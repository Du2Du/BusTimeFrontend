export const ApiRoutes = {
  USER: {
    CREATE_USER: "/v1/users",
    LIST_USERS: "/v1/users",
    UPDATE_USER: "/v1/users",
    LIST_FAVORITE_BUS: "/v1/users/favorite-buses",
    CHANGE_ADMIN: "/v1/users/change-admin",
    LOGIN_USER: "/v1/auth/login",
    USER_ME: "/v1/users/me",
    LOGOUT: "/v1/auth/logout",
  },
  BUS: {
    LIST_BUS: "/v1/bus",
    FILTER_BUS: "/v1/bus/line",
    CREATE_BUS: "/v1/bus",
    SEARCH_BUS: "/v1/bus",
    LIST_BUS_USER: "/v1/bus/user",
    FAVORITE_BUS: "/v1/bus/favorite",
    DISFAVOR_BUS: "/v1/bus/desfavorite",
  },
  PERMISSIONS: {
    LIST_GROUP_PERMISSIONS: "/v1/permissions",
  },
  LOGS: "/v1/logs",
  STATISTICS: {
    GET_BUS_STATISTICS: "/v1/bus/statistics",
  },
};
