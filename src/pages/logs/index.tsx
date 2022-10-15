import React from "react";
import { FixedHead } from "../../components";
import { WithAuth } from "../../global-hoc";
import { SectionLogs } from "../../page-components";

const Logs: React.FC = WithAuth(
  () => {
    return (
      <>
        <FixedHead title="Logs" />
        <SectionLogs />
      </>
    );
  },
  true,
  true
);

export default Logs;
