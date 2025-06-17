import Image from "next/image";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const FinancialAdvisor = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Define grid */}
      <div className="w-[95%] sm:w-[80%] mx-auto items-center grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Content */}
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-delay="100"
        >
          <Image
            src="/images/FinancialAdvisor.png"
            alt="Financial Advisor"
            width={1000}
            height={1000}
            className="object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="p-6">
          <h1 className="text-base font-semibold text-brand-orange ">
            Financial Advisor Bersetifikat
          </h1>
          <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Financial Advisor Siap Membantu Anda
          </h1>
          <p className="mt-4 text-gray-600 text-sm font-medium leading-[1.5rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur totam, mollitia tempore reprehenderit deleniti ut
            commodi non quis aliquid nesciunt at voluptate beatae blanditiis
            illo iure, minima optio rerum. Laudantium!
          </p>
          <ul className="mt-7 space-y-2 text-gray-800">
            <li className="flex items-center font-semibold">
              <FaCheckCircle className="text-green-500 mr-2" />
              Rencana Masa Depan
            </li>
            <li className="flex items-center font-semibold">
              <FaCheckCircle className="text-green-500 mr-2" />
              Saran Berkelanjutan
            </li>
            <li className="flex items-center font-semibold">
              <FaCheckCircle className="text-green-500 mr-2" />
              Check Pola Financial
            </li>
          </ul>

          {/* Button */}
          <button className="md:px-6 mt-8 md:py-2 px-6 py-2 text-white font-semibold text-base bg-brand-orange hover:bg-orange-400 transition-all duration-200 rounded-full cursor-pointer">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialAdvisor;
