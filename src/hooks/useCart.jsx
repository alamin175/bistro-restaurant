// // api, axios (axios secure), tan stack

// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { UserContext } from "../AuthContext/AuthContext";

// const useCart = () => {
//   const { user } = useContext(UserContext);
//   const token = localStorage.getItem("access-token");

//   const { refetch, data: cart = [] } = useQuery({
//     queryKey: ["carts", user?.email],
//     queryFn: async () => {
//       refetch;
//       // console.log(user.email);
//       const res = await fetch(
//         `https://bistro-restaurant-server-chi.vercel.app/carts?email=${user?.email}`,
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return res.json();
//     },
//   });

//   return [cart, refetch];
// };

// export default useCart;

// api, axios (axios secure), tan stack

// --------------------------------
// other way
// --------------------------------

// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { UserContext } from "../AuthContext/AuthContext";

// const useCart = () => {
//   const { user } = useContext(UserContext);
//   const token = localStorage.getItem("access-token");

//   const { refetch, data: cart = [] } = useQuery({
//     queryKey: ["carts", user?.email],
//     queryFn: async () => {
//       try {
//         // console.log(user.email);
//         const res = await fetch(
//           `https://bistro-restaurant-server-chi.vercel.app/carts?email=${user?.email}`,
//           {
//             headers: {
//               authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch cart data");
//         }

//         return res.json();
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//         throw error;
//       }
//     },
//   });

//   return [cart, refetch];
// };

// export default useCart;

// ------------------------------
// using tanstack query
// ------------------------------
// api, axios (axios secure), tan stack

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

import { useContext } from "react";
import { UserContext } from "../AuthContext/AuthContext";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UserContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });

  return [cart, refetch];
};

export default useCart;
