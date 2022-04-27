import type { NextPage } from "next";
import { Button, FixedHead } from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <FixedHead title="Home" />
      <Button color="danger" label="teste" />
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
