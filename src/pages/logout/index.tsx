import Router from "next/router";
import React from "react";
import { WithAuth } from "../../global-hoc";

const Logout: React.FC = WithAuth(() => {
  fetch("http://localhost:8090/logout").finally(() => {
    Router.reload();
  });
  return <div></div>;
});

export default Logout;
