import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_PK);
const Payment = () => {
  return (
    <>
      <Helmet>
        <title>Payment-Bistro Boss</title>
      </Helmet>
      <SectionTitle
        heading="payment"
        subHeading="Payment to complete order"
      ></SectionTitle>
      <div className="w-full px-6 ">
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </>
  );
};

export default Payment;
