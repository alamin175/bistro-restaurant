// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { UserContext } from "../AuthContext/AuthContext";

// const useAxiosSecure = () => {
//   const navigate = useNavigate();
//   const { logOut } = useContext(UserContext);
//   const axiosSecure = axios.create({
//     baseURL: "https://bistro-restaurant-server-chi.vercel.app",
//   });

//   // request interceptor to add authorization header for every secure call to teh api
//   useEffect(() => {
//     axiosSecure.interceptors.request.use((config) => {
//       const token = localStorage.getItem("access-token");
//       // console.log(token);
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     });

//     axiosSecure.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         console.log(error.message);
//         if (
//           error.response &&
//           (error.response.status === 401 || error.response.status === 403)
//         ) {
//           await logOut();
//           navigate("/login");
//         }
//         return Promise.reject(error);
//       }
//     );
//   }, [logOut, navigate, axiosSecure]);

//   return [axiosSecure];
// };

// export default useAxiosSecure;

import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../AuthContext/AuthContext";

const axiosSecure = axios.create({
  baseURL: "https://bistro-restaurant-server-chi.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut, loading } = useContext(UserContext);

  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("Token in request interceptor:", token);

      // Check if the token is present and not expired
      if (!token) {
        // Handle case when token is missing
        loading(true);
        console.error("Access token is missing. Redirecting to login.");
        navigate("/login");
        return Promise.reject("Access token is missing.");
      }

      // Add the token to the request headers
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // console.log("Status in response interceptor:", status);

      // for 401 or 403 logout the user and move the user to the login
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};
export default useAxiosSecure;
