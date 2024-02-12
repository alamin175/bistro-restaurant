const PopularItem = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="md:flex mx-auto my-2 space-x-2">
      <div className="md:flex">
        <img
          style={{ borderRadius: "0 200px 200px 200px" }}
          className="w-10/12 mx-auto md:w-28 "
          src={image}
          alt=""
        />
        <div className="p-4 md:ml-5">
          <h3 className="text-2xl uppercase">{name} ------------------ </h3>
          <p>{recipe} </p>
        </div>
      </div>
      <p className="text-yellow-500">${price} </p>
    </div>
  );
};

export default PopularItem;
