import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full pt-[2vh] md:pt-[12vh] bg-brand-white">
      <div className="flex justify-center flex-col w-[90%] sm:w-[80%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 mt-20">
          {/* Text Content */}
          <div>
            {/* Top box */}
            {/* <div className="w-fit py-1.5 px-2 md:px-5 rounded-full shadow-md flex items-center space-x-3 bg-white">
              <div className="px-3 py-1 md:px-5 md:py-1 rounded-full bg-brand-orange md:text-base sm:text-sm text-xs text-white">
                News
              </div>
              <p className="text-xs sm:text-sm">
                We have update out term & condition policy
              </p>
            </div> */}

            {/* Heading */}
            <h1
              data-aos="fade-up"
              className="text-2xl sm:text-4xl md:text-5xl mt-6 mb-6 font-bold md:leading-[3rem] lg:leading-[3.5rem]"
            >
              Ada yang Salah dengan Pola Keuangan Anda?
            </h1>
            <p data-aos="fade-up" className="text-gray-700">
              Kenali kondisi finansial Anda lebih dini demi menuju masa depan
              keuangan yang lebih terarah.
            </p>

            {/* Button Financial Check Up */}
            <div
              data-aos="fade-up"
              className="flex mt-8 mb-8 items-center space-x-4"
            >
              <Link href="/financial-check">
                <button className="px-6 py-2 text-white font-semibold text-base bg-brand-orange hover:bg-brand-gold transition-all duration-200 rounded-full cursor-pointer">
                  Cek Kondisi Finansial
                </button>
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="hidden lg:block"
          >
            <Image src="/images/hero.png" alt="hero" width={700} height={700} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
