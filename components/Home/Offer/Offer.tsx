import React from "react";

const Offer = () => {
  return (
    <div className="flex items-center justify-center pt-24 pb-24 mb-20 bg-[#2c2727]">
      <div className="text-center px-6">
        <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">Explore ultimate with premium plan</h2>
        <p className="text-gray-400 mb-8">Ceritakan struggle Anda dalam mencari jawaban yang tepat.</p>
        <button className="px-6 py-2 mb-4 text-white font-semibold text-base bg-brand-orange hover:bg-brand-gold transition-all duration-200 rounded-full cursor-pointer">
          Start Consul
        </button>
        <p className="text-gray-400 text-[10px]">No Credit Card Required</p>
      </div>
    </div>
  );
};

export default Offer;
