import Image from "next/image";
import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

type Props = {
  name: string;
  image: string;
  job: string;
  testimonial: string;
};

const ReviewCard = ({ name, image, job, testimonial }: Props) => {
  return (
    <div className="w-full lg:w-[90%] relative mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div>
        <FaQuoteLeft className="w-14 h-14 opacity-10 absolute top-8" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center ">
        {/* Content */}
        <div className="col-span-3 order-2 lg:order-1">
          <p className="mt-8 text-sm sm:text-base md:text-lg font-medium leading-[1.5rem] sm:leading-[1.8rem]">
            {testimonial}
          </p>
          <div className="flex items-center mt-6">
            <FaStar className="text-yellow-600 w-6 h-6" />
            <FaStar className="text-yellow-600 w-6 h-6" />
            <FaStar className="text-yellow-600 w-6 h-6" />
            <FaStar className="text-yellow-600 w-6 h-6" />
            <FaStar className="text-yellow-600 w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold mt-6">{name}</h1>
          <p className="mt-2 text-lg text-gray-600 font-medium mb-6">{job}</p>
        </div>

        {/* Image */}
        <div className="col-span-2 mx-auto order-1 lg:order-2">
          <Image
            src={image}
            alt="client"
            width={250}
            height={250}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
