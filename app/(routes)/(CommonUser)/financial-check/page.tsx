import FinancialCheckWrapper from "@/components/FinancialCheck/Form/FinancialCheckWrapper";
import React from "react";

const FinancialCheckPage = () => {
  return (
    <div className="w-full pt-[15vh] pb-[15vh] md:pt-[20vh] md:pb-[10vh] bg-brand-white">
      <div className="flex justify-center flex-col w-[90%] sm:w-[80%] h-full mx-auto">
        <FinancialCheckWrapper />
      </div>
    </div>
  );
};

export default FinancialCheckPage;
