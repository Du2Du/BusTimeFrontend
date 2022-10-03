import Router from "next/router";
import React, { useEffect } from "react";
import { FixedHead } from "../../components";
import { useUserContext } from "../../global-context";
import { WithAuth } from "../../global-hoc";
import { Header } from "../../page-components/home";
import { PermissionsMain } from "../../page-components/permissions";
import { routesName } from "../../routes-name";
import { PermissionsGroupName } from "../../utils";

const Permissions: React.FC = WithAuth(() => {
  const { userData, verifyPermissionsGroup } = useUserContext();

  useEffect(() => {
    if (!verifyPermissionsGroup(PermissionsGroupName.SUPER_ADMINISTRATOR))
      Router.push(routesName.HOME);
  }, [userData]);

  return (
    <div>
      <FixedHead title="Permissões" />
      <Header />
      <PermissionsMain />
    </div>
  );
}, true);

export default Permissions;