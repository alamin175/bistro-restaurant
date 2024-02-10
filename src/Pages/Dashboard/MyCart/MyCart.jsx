import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import useCart from "../../../hooks/useCart";

const MyCart = () => {
  const [cart, refetch] = useCart();
  // reduce function using to get total price from a array like object .
  // const totalPrice = cart
  //   .reduce((sum, item) => parseFloat(item?.price) + sum, 0)
  //   .toFixed(2);
  const price = cart.reduce((sum, item) => sum + item?.price, 0);
  const floatPrice = parseFloat(price).toFixed(2);
  const totalPrice = parseFloat(floatPrice);
  console.log(totalPrice);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
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
    <>
      <SectionTitle heading="wanna add ?" subHeading="My Cart"></SectionTitle>
      <div className="w-full ">
        <div className="flex uppercase h-[60px] items-center justify-center ">
          <h1 className="text-3xl mr-11">Added Items : {cart.length} </h1>
          <h1 className="text-3xl mr-11">Total Price : ${totalPrice} </h1>
          {cart.length ? (
            <Link to="/dashboard/payment">
              <button className="btn btn-warning btn-sm">Pay Now</button>
            </Link>
          ) : (
            <button
              disabled
              title="Add product on your cart to payment"
              className=" btn-warning btn-sm"
            >
              Pay
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="uppercase">
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th className="text-end">Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1} </td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td className="text-end">$ {item.price}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn bg-red-600 text-white px-3  hover:bg-red-800"
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
    </>
  );
};

export default MyCart;
