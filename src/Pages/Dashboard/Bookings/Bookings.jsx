import { Helmet } from "react-helmet";
import SectionTitle from "../../../components/SectionTItle/SectionTitle";

const Bookings = () => {
  return (
    <>
      <Helmet>
        <title>Bookings-Bistro Boss</title>
      </Helmet>
      <SectionTitle
        heading="manage bookings"
        subHeading="Some Bookings "
      ></SectionTitle>
      <div>
        <h1 className="text-2xl"> Bookings Feature will come shortly .</h1>
      </div>
    </>
  );
};

export default Bookings;
