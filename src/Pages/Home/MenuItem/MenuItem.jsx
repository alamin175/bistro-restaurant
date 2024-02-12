import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import PopularItem from "../../Shared/PopularItem/PopularItem";

const MenuItem = () => {
  const [menu] = useMenu();
  const popularItem = menu.filter((item) => item.category === "popular");
  return (
    <div>
      <SectionTitle
        subHeading={"Check it out"}
        heading={"from our menu"}
      ></SectionTitle>
      <div className="md:w-10/12 grid lg:grid-cols-2 gap-10 mx-auto mb-10">
        {popularItem.map((item) => (
          <PopularItem key={item._id} item={item}></PopularItem>
        ))}
      </div>
      <div className="mx-auto  text-center">
        <Link to="/menu">
          <button className="btn md:mt-6 btn-outline b-o border-b-4 border-black">
            View Full Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuItem;
