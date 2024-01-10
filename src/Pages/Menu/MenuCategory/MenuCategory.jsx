import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import Cover from "../../Shared/Cover/Cover";
import PopularItem from "../../Shared/PopularItem/PopularItem";

const MenuCategory = ({ items, title, heading, subHeading, img }) => {
  return (
    <div>
      {<Cover img={img} title={title}></Cover>}
      <SectionTitle heading={heading} subHeading={subHeading}></SectionTitle>
      <div className="md:w-10/12 grid md:grid-cols-2 gap-10 mx-auto mb-10">
        {items.map((item) => (
          <PopularItem key={item._id} item={item}></PopularItem>
        ))}
      </div>
      <div className="mx-auto  text-center">
        <Link to={`/order/${title}`}>
          <button className="btn  mb-16 btn-outline b-o border-b-4 border-black">
            Order Your Favorite Food
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
