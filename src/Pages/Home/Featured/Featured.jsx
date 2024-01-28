import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import img from "../../../asset/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <>
      <div className="featured-container mt-16 my-10 pt-10 text-white">
        <SectionTitle
          heading={"from our menu"}
          subHeading={"Check it Out"}
        ></SectionTitle>
        {/* <div className="absolute inset-0 bg-black opacity-50 bg-overlay"></div> */}

        <div className="md:flex  items-center justify-center pb-20 pt-12 px-36 mx-auto">
          <div>
            <img src={img} alt="" />
          </div>
          <div className="md:ml-10">
            <h3 className="text-4xl"> January 9, 2024</h3>
            <h3 className="text-2xl uppercase">Where i can get some ?</h3>
            <p>
              What types of dish you want ? . Visit our website and find your
              super dish . we have more than 100+ item in our restaurant . You
              can order on our website and also home delivery available on all
              over in Bangladesh
            </p>
            <button className="btn btn-outline border-0 text-white mt-4 border-b-4 hover:bg-yellow-400 hover:text-black">
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
