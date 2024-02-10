import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../../AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [clientSecret, SetClientSecret] = useState("");

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          SetClientSecret(res.data.clientSecret);
          // console.log(res.data);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
      console.log("some error are occured", error);
    } else {
      setError("");
      // console.log(paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      setError(confirmError.message);
      setTransactionId("");
    }
    if (paymentIntent.status === "succeeded") {
      // console.log(paymentIntent);
      setTransactionId(paymentIntent.id);
      setError("");
      const payment = {
        email: user.email,
        price: totalPrice,
        date: new Date() /* utc convert, use moment js to utc for international time */,
        transactionId: paymentIntent.id,
        cartIds: cart.map((item) => item._id),
        menuItemIds: cart.map((item) => item.cartId),
        status: "pending",
      };
      const res = await axiosSecure.post("/payments", payment);
      // console.log(res);

      if (res.data.paymentResult.insertedId) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your payment successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/paymentHistory");
      }
      // console.log(res.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          border: "1px solid ",
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <div className="flex">
        <button
          className="btn bg-gradient-to-r mx-auto m-6 from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Payment Confirm
        </button>
      </div>
      <p className="text-red-500">{error} </p>
      {transactionId && (
        <p className="text-green-600">
          Your Payment Transaction id is : {transactionId}{" "}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
