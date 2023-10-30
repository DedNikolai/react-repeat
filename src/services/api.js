import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://nestjs-boilerplate-test.herokuapp.com/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get("auth-token");

    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
      config.headers['Content-Type'] = 'application/json'
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;