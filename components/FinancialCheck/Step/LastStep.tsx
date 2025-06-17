"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function LastStep() {
  return (
    <div className="text-center px-4 py-12 bg-white rounded-lg border border-amber-200 shadow-sm">
      <div className="flex justify-center mb-6">
        <FaCheckCircle className="w-12 h-12 text-amber-500" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Anda berada di langkah terakhir</h2>
      <p className="text-base mx-10 md:mx-20 ">
        Anda telah menyelesaikan seluruh langkah pengisian data keuangan.
        Silakan klik tombol <strong className="text-amber-600">Submit</strong> di bawah untuk melihat hasil
        Financial Check-Up Anda.
      </p>
    </div>
  );
}

export default LastStep;
