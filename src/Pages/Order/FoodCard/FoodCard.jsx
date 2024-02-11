import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../../AuthContext/AuthContext";
import useCart from "../../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();
  const { name, price, image, recipe, _id } = item;
  const handleAddToCart = (items) => {
    // console.log(items);
    const cartItem = {
      cartId: _id,
      email: user?.email,
      name,
      image,
      price,
    };
    if (user && user.email) {
      fetch("https://bistro-restaurant-server-chi.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.insertedId) {
            refetch(); /* refetch cart to update the numver of items in the cart */
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Product added to your cart",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login for add product on your cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} />
      </figure>
      <p className="absolute right-4 m-3 bg-slate-900 text-white p-1 px-2">
        ${price}{" "}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name} </h2>
        <p>{recipe}</p>
        <button
          onClick={() => handleAddToCart(item)}
          className="btn btn-outline btn-primary border-b-4"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
