import { AxiosResponse } from "axios";
import Router, { useRouter } from "next/router";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiRoutes } from "../../api-routes";
import { useLoadingSpinner } from "../../hooks";
import { UserDataProps } from "../../interfaces";
import { Backend } from "../../services/backend";
import { PermissionsGroupName, showError } from "../../utils";

interface UserInterface {
  userData?: UserDataProps;
  getUser: () => Promise<void | AxiosResponse<UserInterface, any>>;
  isAdmin: boolean;
}

const UserContext = createContext<UserInterface>({} as UserInterface);

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataProps>();
  const { setFalse, setTrue } = useLoadingSpinner();
  const isAdmin = useMemo(
    () =>
      userData?.permissionsGroup.name === PermissionsGroupName.ADMINISTRATOR ||
      userData?.permissionsGroup.name ===
        PermissionsGroupName.SUPER_ADMINISTRATOR,
    [userData]
  );

  const getUser = useCallback(async () => {
    setTrue();
    Backend.get(ApiRoutes.USER_ME)
      .then((res) => {
        setUserData(res.data);
      })
      .finally(setFalse);
  }, []);

  useEffect(() => {
    if (!userData) {
      getUser();
    }
  }, [userData]);

  useEffect(() => {
    if (userData) Router.reload();
  }, []);

  return (
    <UserContext.Provider value={{ userData, getUser, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
