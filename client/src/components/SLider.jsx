import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";
import { Pagination } from "@mui/material";

const SLider = () => {
  const products = useSelector((state) => state.products);
  const [fruits, setFruits] = useState(null);
  useEffect(() => {
    setFruits(products?.filter((data) => data.product_category === "fruits"));
  }, [products]);

  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        grabCursor={true}
        className="mySwiper"
      >
        {fruits &&
          fruits.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SLider;
