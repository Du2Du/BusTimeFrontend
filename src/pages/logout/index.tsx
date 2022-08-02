import React from "react";
import { WithAuth } from "../../global-hoc";

const Logout: React.FC = WithAuth(() => {
  return <div></div>;
});

export default Logout;
