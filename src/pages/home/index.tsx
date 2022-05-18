import React from "react";
import { WithAuth } from "../../global-hoc";

const Home: React.FC = WithAuth(() => {
  return <div>Text</div>;
});

export default Home;
