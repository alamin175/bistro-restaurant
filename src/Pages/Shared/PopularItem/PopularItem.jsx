const PopularItem = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="flex ml-6 space-x-2">
      <div className="flex">
        <img
          style={{ borderRadius: "0 200px 200px 200px" }}
          className=" w-28 "
          src={image}
          alt=""
        />
        <div className="md:ml-5">
          <h3 className="text-2xl uppercase">{name} ------------------ </h3>
          <p>{recipe} </p>
        </div>
      </div>
      <p className="text-yellow-500">${price} </p>
    </div>
  );
};

export default PopularItem;
