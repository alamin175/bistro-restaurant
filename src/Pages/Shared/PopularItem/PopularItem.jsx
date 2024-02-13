const PopularItem = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="p-4 md:p-0 md:flex space-x-2">
      <div className="md:flex">
        <img
          style={{ borderRadius: "0 200px 200px 200px" }}
          className="mx-auto md:w-28 "
          src={image}
          alt=""
        />
        <div className=" px-4">
          <h3 className="text-2xl uppercase">{name} ------------------ </h3>
          <p>{recipe} </p>
        </div>
      </div>
      <p className="text-yellow-500">${price} </p>
    </div>
  );
};

export default PopularItem;
