import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import Cover from "../../Shared/Cover/Cover";
import PopularItem from "../../Shared/PopularItem/PopularItem";

const MenuCategory = ({ items, title, subTitle, img }) => {
  return (
    <div>
      {<Cover img={img} title="our menu"></Cover>}
      <SectionTitle subTitle={subTitle} title={title}></SectionTitle>
      <div className="md:w-10/12 grid md:grid-cols-2 gap-10 mx-auto mb-10">
        {items.map((item) => (
          <PopularItem key={item._id} item={item}></PopularItem>
        ))}
      </div>
      <div className="mx-auto  text-center">
        <button className="btn  mb-16 btn-outline b-o border-b-4 border-black">
          View Full Menu
        </button>
      </div>
    </div>
  );
};

export default MenuCategory;
