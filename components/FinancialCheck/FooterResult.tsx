import { Download, RefreshCcw } from "lucide-react";
import React from "react";

const FooterResult = () => {
  return (
    <div>
      {/* Footer */}
      <div className="mt-8 border-t-[1.5px] pt-2 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        {/* Konsultasi Section */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-yellow-800 mb-1">
            Ketahui detail kondisi keuanganmu
          </h3>
          <p className="text-sm text-yellow-700 mb-3">
            Kami menyediakan konsultasi untuk Anda
          </p>
          <a
            href="https://wa.me/6281615661176"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          >
            Konsultasi via WhatsApp
          </a>
        </div>

        {/* Aksi Buttons */}
        <div className="flex lg:justify-end justify-center gap-3">
          <button
            onClick={() => location.reload()}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 font-medium px-4 py-2 rounded-md transition"
          >
            <RefreshCcw size={16} />
            Cek Ulang
          </button>

          <button
            onClick={() => window.print()} // Atau export PDF jika sudah ada
            className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-sm text-white font-medium px-4 py-2 rounded-md transition"
          >
            <Download size={16} />
            Unduh Hasil
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterResult;
