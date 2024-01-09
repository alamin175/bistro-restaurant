import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../../../asset/home/slide1.jpg";
import slide2 from "../../../asset/home/slide2.jpg";
import slide3 from "../../../asset/home/slide3.jpg";
import slide4 from "../../../asset/home/slide4.jpg";
import slide5 from "../../../asset/home/slide5.jpg";

import { Pagination } from "swiper/modules";
const Category = () => {
  return (
    <div className="my-12">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
          <h3 className="text-4xl text-center text-bold text-white -mt-12">
            Salads
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <h3 className="text-4xl text-center text-bold text-white -mt-12">
            Pizzas
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <h3 className="text-4xl text-center text-bold text-white -mt-12">
            Soups
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <h3 className="text-4xl text-center text-bold text-white -mt-12">
            Desserts
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <h3 className="text-4xl text-center text-bold text-white -mt-12">
            Salads
          </h3>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Category;
