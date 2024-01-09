import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import PopularItem from "../../Home/PopularItem/PopularItem";

const MenuItem = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularItem = data.filter((item) => item.category === "popular");
        setMenu(popularItem);
      });
  }, []);
  return (
    <div>
      <SectionTitle
        subTitle={"Check it out"}
        title={"from our menu"}
      ></SectionTitle>
      <div className="md:w-10/12 grid md:grid-cols-2 gap-10 mx-auto mb-10">
        {menu.map((item) => (
          <PopularItem key={item._id} item={item}></PopularItem>
        ))}
      </div>
      <div className="mx-auto  text-center">
        <button className="btn mt-6 btn-outline b-o border-b-4 border-black">
          View Full Menu
        </button>
      </div>
      <div className="p-20 m-10 mt-24 bg-black text-center text-white">
        <h1 className="text-6xl"> Call Us : +8801586075605 </h1>
      </div>
    </div>
  );
};

export default MenuItem;
