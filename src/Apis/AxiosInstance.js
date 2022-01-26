import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

console.log("lấy ra", localStorage.getItem('token'));

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: localStorage.getItem("token")
  }
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => err
    // axiosInstance.post('/user/refreshToken', {
    //   refreshToken: localStorage.getItem('refreshToken')
    // })
    // .then(data => {
    //   localStorage.removeItem("token");
    //   localStorage.setItem("token", data.data.token);
    //   <Navigate to="/" />
    // })
  
);

export default axiosInstance;