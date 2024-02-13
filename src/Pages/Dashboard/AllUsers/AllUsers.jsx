import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`)

      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.email} is now Admin`,
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${id}`)

          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <div className="w-11/12">
      <h1 className="text-4xl text-center font-bold">
        Total Users : {users.length}{" "}
      </h1>
      <div className="overflow-x-auto">
        <table className="lg:table w-11/12">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1} </th>
                <td>{user.name} </td>
                <td>{user.email} </td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      title="Make Admin"
                      onClick={() => handleAdmin(user)}
                      className="text-2xl p-2 text-black px-3 hover:bg-green-700 hover:text-white"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}{" "}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-xl p-2 bg-red-600 text-white px-3 hover:bg-red-700"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
