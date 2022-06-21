import Router from "next/router";
import React, { useEffect } from "react";
import { ApiRoutes } from "../../api-routes";
import { WithAuth } from "../../global-hoc";
import { routesName } from "../../routes-name";
import { Backend } from "../../services/backend";

const Logout: React.FC = WithAuth(() => {
  useEffect(() => {
    Backend.get(ApiRoutes.LOGOUT)
      .then(() => {
        Router.push(routesName.LOGIN).then(() => {
          Router.reload();
        });
      })
      .catch(() => {
        Router.push(routesName.HOME);
      });
  }, []);

  return <div></div>;
});

export default Logout;
