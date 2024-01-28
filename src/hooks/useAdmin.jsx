import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../AuthContext/AuthContext";

const useAdmin = () => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("access-token");

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users/admin/${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log("isadmin response", res);
      return res.json();
    },
  });

  return [isAdmin, isAdminLoading];
};
export default useAdmin;

// import { useQuery } from "@tanstack/react-query";
// import { useContext, useEffect } from "react";
// import { UserContext } from "../AuthContext/AuthContext";

// const useAdmin = () => {
//   const { user } = useContext(UserContext);
//   const token = localStorage.getItem("access-token");

//   // Declare isAdmin and isAdminLoading outside of useQuery
//   let isAdmin, isAdminLoading;

//   // Use useEffect to fetch isAdmin data when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, isLoading } = await useQuery({
//         queryKey: ["isAdmin", user?.email],
//         queryFn: async () => {
//           const res = await fetch(
//             `http://localhost:5000/users/admin/${user?.email}`,
//             {
//               headers: {
//                 authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           return res.json();
//         },
//       });

//       // Set the values for isAdmin and isAdminLoading
//       isAdmin = data;
//       isAdminLoading = isLoading;
//     };

//     fetchData(); // Call the fetchData function
//   }, []); // Empty dependency array means this effect runs only once when the component mounts

//   // Return isAdmin and isAdminLoading after the useEffect has run
//   return [isAdmin, isAdminLoading];
// };

// export default useAdmin;
