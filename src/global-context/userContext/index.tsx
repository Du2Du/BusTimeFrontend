import { AxiosResponse } from "axios";
import Router from "next/router";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiRoutes } from "../../api-routes";
import { useLoadingSpinner } from "../../hooks";
import { MenusProps, UserDataProps } from "../../interfaces";
import { Backend } from "../../services/backend";
import { PermissionsGroupName } from "../../utils";

interface UserInterface {
  userData?: UserDataProps;
  getUser: () => Promise<void | AxiosResponse<UserInterface, any>>;
  getMenus: () => void;
  menus: Array<MenusProps>;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  verifyPermissionsGroup: (
    permissionsGroup: string,
    user?: UserDataProps
  ) => boolean;
}

const UserContext = createContext<UserInterface>({} as UserInterface);

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataProps>();
  const [menus, setMenus] = useState<Array<MenusProps>>([]);
  const {setFalse, setTrue} = useLoadingSpinner();
  const getMenus = useCallback(() => {
    Backend.get(ApiRoutes.GET_MENUS).then((res) => setMenus(res.data));
  }, []);

  const getUser = useCallback(async () => {
   setTrue();
    Backend.get(ApiRoutes.USER_ME).then((res) => {
      setUserData(res.data);
    }).finally(setFalse);
  }, []);

  const verifyPermissionsGroup = useCallback(
    (permissionsGroup: string, user?: UserDataProps) => {
      if (user) return user?.permissionsGroup?.name === permissionsGroup;
      return userData?.permissionsGroup?.name === permissionsGroup;
    },
    [userData]
  );

  const isAdmin = useMemo(
    () => !verifyPermissionsGroup(PermissionsGroupName.DEFAULT),
    [userData]
  );

  const isSuperAdmin = useMemo(
    () => verifyPermissionsGroup(PermissionsGroupName.SUPER_ADMINISTRATOR),
    [userData]
  );

  useEffect(() => {
    if (!userData) getUser();
    else getMenus();
  }, [userData]);

  useEffect(() => {
    if (userData) Router.reload();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        getUser,
        getMenus,
        menus,
        isAdmin,
        verifyPermissionsGroup,
        isSuperAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
