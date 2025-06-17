"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReviewCard from "./ReviewCard";
import CustomDot from "./CustomDot";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Review = () => {
  return (
    <div id="Testimonial" className="pt-16 pb-16 bg-brand-white">
      <h1 className="mt-6 text-2xl md:text-3xl capitalize font-bold text-center">
        What client say about us
      </h1>

      <div className="mt-20 w-[90%] md:w-[80%] mx-auto">
        <Carousel
          arrows={false}
          autoPlay={true}
          autoPlaySpeed={4000}
          infinite
          responsive={responsive}
          showDots
          customDot={<CustomDot />}
          containerClass="pb-10"
          dotListClass="flex justify-center mt-6"
        >
          <ReviewCard
            name="Haikal Sememi"
            image="/images/client-1.png"
            job="Industrial Designer"
          />
          <ReviewCard
            name="Ayu Sidoarjo"
            image="/images/client-2.png"
            job="Lawyer"
          />
          <ReviewCard
            name="Agus Pasar Kembang"
            image="/images/client-3.png"
            job="Chief Executive Officer"
          />
          <ReviewCard
            name="Wiwin Kenjeran"
            image="/images/client-4.png"
            job="Model"
          />
        </Carousel>
      </div>
    </div>
  );
};

export default Review;
