import { AxiosResponse } from "axios";
import Router, { useRouter } from "next/router";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ApiRoutes } from "../../api-routes";
import { useLoadingSpinner } from "../../hooks";
import { UserDataProps } from "../../interfaces";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";

interface UserInterface {
  userData?: UserDataProps;
  getUser: () => Promise<void | AxiosResponse<UserInterface, any>>;
}

const UserContext = createContext<UserInterface>({} as UserInterface);

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataProps>();
  const { setTrue, setFalse } = useLoadingSpinner();
  const getUser = useCallback(async () => {
    setTrue();
    Backend.get(ApiRoutes.USER_ME)
      .then((res) => {
        setUserData(res.data);
      })
      .finally(setFalse);
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
