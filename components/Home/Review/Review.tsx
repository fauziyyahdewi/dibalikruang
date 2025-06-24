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
            testimonial="Saya benar-benar terbantu dengan tools check-up dari dibalikruang. Gampang digunakan dan langsung kasih insight. Tim advisornya juga menjelaskan hasilnya dengan bahasa yang mudah dipahami, cocok banget buat saya yang masih awam soal keuangan."
          />
          <ReviewCard
            name="Ayu Sidoarjo"
            image="/images/client-2.png"
            job="Lawyer"
            testimonial="Awalnya saya pikir kondisi keuangan saya cukup aman. Tapi setelah melakukan financial check-up di dibalikruang, saya menyadari banyak pos pengeluaran yang bisa dioptimalkan. Financial advisor-nya juga sabar banget menjelaskan dan memberi saran yang sesuai dengan kondisi saya. Rasanya seperti punya mentor keuangan pribadi."
          />
          <ReviewCard
            name="Agus Pasar Kembang"
            image="/images/client-3.png"
            job="Chief Executive Officer"
            testimonial="Sebagai CEO, saya butuh keputusan finansial yang tepat. Check-up keuangan dari dibalikruang memberi insight yang jelas dan actionable. Pelayanan dari financial advisor-nya juga sangat profesional dan membantu saya menyusun strategi keuangan jangka panjang"
          />
          <ReviewCard
            name="Wiwin Kenjeran"
            image="/images/client-4.png"
            job="Freelancer"
            testimonial="Pekerjaan saya sebagai freelancer bikin penghasilan nggak tetap. Check-up keuangan di dibalikruang benar-benar membuka wawasan saya tentang pentingnya dana darurat dan investasi terencana. Financial advisor-nya juga komunikatif dan supportif banget. Nggak cuma tools-nya yang oke, tapi juga pendampingannya."
          />
        </Carousel>
      </div>
    </div>
  );
};

export default Review;
