const returnAppUrl = () => {
  return process.env.APP_BASE === "production"
    ? process.env.APP_URL
    : process.env.APP_TEST_URL;
};

export const appUrl = returnAppUrl();
