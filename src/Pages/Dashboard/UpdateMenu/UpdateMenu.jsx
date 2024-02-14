import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateMenu = () => {
  const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  //   console.log(id);

  const { data: item, refetch } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/manageItems/updateMenu/${id}`
      );
      return res.data;
      //   console.log(res);
    },
  });
  //   console.log(item);
  const onSubmit = async (data) => {
    console.log(data);
    // send image url to imgbb and hosting
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: res.data.data.display_url,
        category: data.category,
        price: parseFloat(data.price),
      };
      const menuRes = await axiosSecure.patch(`/updateMenu/${id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        refetch();
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Update Menu-Bistro Boss</title>
      </Helmet>
      <SectionTitle
        heading="update menu"
        subHeading="Update menu with your requirement"
      ></SectionTitle>

      <div>
        <div className="bg-gray-200 p-10 px-16">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Recipe Name* </span>
              </label>
              <input
                type="text"
                placeholder="Recipe Name"
                {...register("name", { required: true })}
                defaultValue={item?.name}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex gap-6">
              {/* category */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Category*</span>
                </label>
                <select
                  defaultValue={item?.category}
                  {...register("category", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>

              {/* price */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Price*</span>
                </label>
                <input
                  defaultValue={item?.price}
                  type="number"
                  placeholder="Price"
                  {...register("price", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            {/* recipe details */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Details</span>
              </label>
              <textarea
                defaultValue={item?.recipe}
                {...register("recipe")}
                className="textarea textarea-bordered h-24"
                placeholder="Bio"
              ></textarea>
            </div>

            <div className="form-control w-full my-6">
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full max-w-xs"
              />
            </div>

            <div className="flex justify-center">
              <button className="btn bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500">
                Update Menu <FaUtensils className="ml-4"></FaUtensils>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateMenu;
