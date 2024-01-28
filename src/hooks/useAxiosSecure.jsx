import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../AuthContext/AuthContext";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(UserContext);
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });

  // request interceptor to add authorization header for every secure call to teh api
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      // console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error.message);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;
