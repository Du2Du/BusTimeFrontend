
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactStrictMode: false,
  cssModules: true,
};

module.exports = {
  ...nextConfig,
  ...require("next-transpile-modules")(["@amcharts/amcharts5"]),
  env: {
    APP_URL: "https://bus-time-web.herokuapp.com/api",
    APP_TEST_URL: "http://localhost:8090/api",
    APP_BASE: "experimental",
  },
};
