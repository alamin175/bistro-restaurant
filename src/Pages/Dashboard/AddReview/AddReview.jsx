import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { UserContext } from "../../../AuthContext/AuthContext";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AddReview = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const reviewData = {
      name: data.name,
      recipe: data.recipe,
      rating: data.rating, // Make sure this matches the expected key on the server
      suggestion: data.suggestion,
      details: data.details,
    };

    try {
      const response = await axiosSecure.post("/reviews", reviewData);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Review-Bistro Boss</title>
      </Helmet>
      <SectionTitle
        heading="Give a Review "
        subHeading="It's Your Wishes"
      ></SectionTitle>
      <div className="w-11/12">
        <div className="mx-auto bg-gray-200 p-10 px-16">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control font-xl">
              <h2 className="label-text text-2xl md:text-6xl text-center">
                Rate Us.
              </h2>
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
                required
                className="input input-bordered w-full"
                defaultValue={user?.displayName}
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">
                  Which recipe you liked most?{" "}
                </span>
              </label>
              <input
                type="text"
                placeholder="Recipe Name"
                {...register("recipe", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Give rating</span>
              </label>
              <input
                type="number"
                placeholder="Rating Number. Ex- 4(Only Number)"
                {...register("rating", { required: true })}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Suggestion */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">
                  Do you have any suggestion for us?
                </span>
              </label>
              <input
                type="text"
                placeholder="Suggestion"
                {...register("suggestion", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            {/* rreview details */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Give some explanation about your experience.
                </span>
              </label>
              <textarea
                {...register("details")}
                className="textarea textarea-bordered h-24"
                placeholder="Review details"
              ></textarea>
            </div>

            <div className="flex justify-center mt-4">
              <button className="btn bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500">
                Add Review <FaUtensils className="ml-4"></FaUtensils>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddReview;
