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
import { UserDataProps } from "../../interfaces";
import { Backend } from "../../services/backend";
import { PermissionsGroupName } from "../../utils";

interface UserInterface {
  userData?: UserDataProps;
  getUser: () => Promise<void | AxiosResponse<UserInterface, any>>;
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

  const getUser = useCallback(async () => {
    Backend.get(ApiRoutes.USER_ME).then((res) => {
      setUserData(res.data);
    });
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
      if (!userData) {
        getUser();
      }
  }, [userData]);

  useEffect(() => {
    if (userData) Router.reload();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        getUser,
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
