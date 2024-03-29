import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import img1 from "../../../asset/menu/pizza-bg.jpg";
import img2 from "../../../asset/menu/dessert-bg.jpeg";
import img3 from "../../../asset/menu/soup-bg.jpg";
const ChefRecommends = () => {
  return (
    <>
      <div className="p-10 md:p-20 m-1 block mt-11 md:m-10 mb-2 bg-black text-center text-white">
        <h1 className="text-2xl md:text-6xl"> Call Us : +8801586075605 </h1>
      </div>

      <SectionTitle
        subHeading={"Should Try"}
        heading={"chef recommends"}
      ></SectionTitle>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10 md:w-11/12 mx-auto">
          <div className="card w-96 bg-base-100 m-4 shadow-xl">
            <figure>
              <img className="h-64" src={img1} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Meat Machine Pizza !</h2>
              <p>If you are a pizza lover, you must try this item from us.</p>
              <div className="card-actions justify-center">
                <button className="btn btn-outline btn-primary border-b-4">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 m-4  shadow-xl">
            <figure>
              <img className="h-64" src={img2} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Delicious Dessert !</h2>
              <p>If you are a Dessert lover, you must try this item from us.</p>
              <div className="card-actions justify-center">
                <button className="btn btn-outline btn-primary border-b-4">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 m-4  shadow-xl">
            <figure>
              <img className="h-64" src={img3} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Italian Pizza !</h2>
              <p>If you are a Soup lover, you must try this item from us.</p>
              <div className="card-actions justify-center">
                <button className="btn btn-outline btn-primary border-b-4 border-indigo-500">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChefRecommends;
