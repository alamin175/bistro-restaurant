// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { UserContext } from "../AuthContext/AuthContext";

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../AuthContext/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

// const useAdmin = () => {
//   const { user } = useContext(UserContext);
//   const token = localStorage.getItem("access-token");

//   const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
//     queryKey: ["isAdmin", user?.email],
//     queryFn: async () => {
//       const res = await fetch(
//         `http://localhost:5000/users/admin/${user?.email}`,
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       //   console.log("isadmin response", res);
//       return res.json();
//     },
//   });

//   return [isAdmin, isAdminLoading];
// };
// export default useAdmin;

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UserContext);
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      // console.log(res.data);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
