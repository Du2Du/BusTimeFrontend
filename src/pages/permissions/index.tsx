import React from "react";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { Header } from "../../page-components/home";
import { PermissionsMain } from "../../page-components/permissions";

const Permissions: React.FC = WithAuth(() => {
  return (
    <div>
      <FixedHead title="Permissões" />
      <PermissionsMain />
    </div>
  );
}, true, true);

export default Permissions;
