import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../../../AuthContext/AuthContext";
import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useContext(UserContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      // console.log(res.data);
      return res.data;
    },
  });

  return (
    <>
      <SectionTitle
        heading="payment history"
        subHeading="Your Payment History"
      ></SectionTitle>

      <div className="w-10/12">
        <h1 className="text-3xl font-bold border border-2 mb-4 p-1 text-center border-blue-500 rounded-lg ">
          Total Payments: {payments.length}{" "}
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-xl">
                <th>#</th>
                <th className="text-right">Total Price</th>
                <th className="text-center">Transaction Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1} </td>
                  <td className="text-right">${item.price} </td>
                  <td className="text-center">{item.transactionId} </td>
                  <td className="text-red-600">{item.status} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
