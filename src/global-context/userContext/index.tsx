import { AxiosResponse } from "axios";
import Router from "next/router";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { ApiRoutes } from "../../api-routes";
import { Backend } from "../../services/backend";
import { showError } from "../../utils";

interface UserDataProps {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  cpf: string;
  isAdmin: boolean;
}

interface UserInterface {
  userData?: UserDataProps;
  getUser: () => Promise<void | AxiosResponse<UserInterface, any>>;
}

const UserContext = createContext<UserInterface>({} as UserInterface);

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataProps>();

  const getUser = useCallback(async () => {
    Backend.get(ApiRoutes.USER_ME)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((errors) => {
        showError(errors);
        Router.push("/login");
      });
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
