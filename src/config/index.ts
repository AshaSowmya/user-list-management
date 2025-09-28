const config = {
  production: {
    url: "https://euphonious-pegasus-3d29f1.netlify.app/",
    apiUrl: "https://reqres.in/api/",
  },
  development: {
    url: "https://euphonious-pegasus-3d29f1.netlify.app/",
    apiUrl: "https://reqres.in/api/",
  }
};
const environment = "development";

const hostConfig = {
  WEB_URL: config[environment].url,
  API_URL: config[environment].apiUrl,
  intervals: 500,
};

const intervals = {
  reload: 1500,
};

export default hostConfig;
export { hostConfig, intervals };