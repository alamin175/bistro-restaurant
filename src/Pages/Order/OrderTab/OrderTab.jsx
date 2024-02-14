import FoodCard from "../FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  return (
    <div className="mx-auto grid md:grid-cols-2 px-6 lg:grid-cols-3 mb-5 gap-10 lg:gap-12">
      {items.map((item) => (
        <FoodCard key={item._id} item={item}></FoodCard>
      ))}
    </div>
  );
};

export default OrderTab;
