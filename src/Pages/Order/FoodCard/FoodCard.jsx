const FoodCard = ({ item }) => {
  const { name, price, image, recipe } = item;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} />
      </figure>
      <p className="absolute right-4 m-3 bg-slate-900 text-white p-1 px-2">
        ${price}{" "}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name} </h2>
        <p>{recipe}</p>
        <button className="btn btn-outline btn-primary border-b-4">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
