import React from "react";
import { FaCheck } from "react-icons/fa";

type Props = {
  price: number;
  plan: string;
};

const PriceCard = ({ price, plan }: Props) => {
  return (
    <div className="bg-white p-12 rounded-lg shadow-lg">
      <p className="mt-8 text-xl font-semibold text-brand-orange text-center">
        {plan} Plan
      </p>
      <div className="font-medium text-3xl mt-4 text-center">
        Rp<span className="text-5xl font-bold">{price}</span>/days
      </div>
      <p className="mt-2 text-gray-600 text-center">Per user</p>
      <div className="mt-10">
        <div className="text-center mb-4 flex items-center space-x-3">
          <div className="text-center w-8 h-8 bg-gray-300 rounded-full justify-center flex items-center flex-col">
            <FaCheck className="text-green-500" />
          </div>
          <p className="text-sm font-semibold text-grey-700 ">
            Unlimited Consultation
          </p>
        </div>
        <div className="text-center mb-4 flex items-center space-x-3">
          <div className="text-center w-8 h-8 bg-gray-300 rounded-full justify-center flex items-center flex-col">
            <FaCheck className="text-green-500" />
          </div>
          <p className="text-sm font-semibold text-grey-700 ">
            Basic Actions & Triggers
          </p>
        </div>
        <div className="text-center mb-4 flex items-center space-x-3">
          <div className="text-center w-8 h-8 bg-gray-300 rounded-full justify-center flex items-center flex-col">
            <FaCheck className="text-green-500" />
          </div>
          <p className="text-sm font-semibold text-grey-700 ">Draft Payments</p>
        </div>
        <div className="text-center mb-4 flex items-center space-x-3">
          <div className="text-center w-8 h-8 bg-gray-300 rounded-full justify-center flex items-center flex-col">
            <FaCheck className="text-green-500" />
          </div>
          <p className="text-sm font-semibold text-grey-700 ">
            Unlimited Flows and Supports
          </p>
        </div>
        <div className="text-center mb-4 flex items-center space-x-3">
          <div className="text-center w-8 h-8 bg-gray-300 rounded-full justify-center flex items-center flex-col">
            <FaCheck className="text-green-500" />
          </div>
          <p className="text-sm font-semibold text-grey-700 ">
            Lifetime Updates
          </p>
        </div>
        <div className="mt-8 ">
          <button className="block w-full p-4 text-base md:text-lg text-white font-bold bg-orange-600 hover:bg-orange-700 transition-all duration-300">
            Consul Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
