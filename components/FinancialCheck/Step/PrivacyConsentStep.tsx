"use client";

import React, { useState } from "react";

const PrivacyConsentStep = ({
  onConsentAccepted,
}: {
  onConsentAccepted: () => void;
}) => {
  const [consentGiven, setConsentGiven] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsentGiven(e.target.checked);
  };

  return (
    <div>
      <div className="space-y-4 text-sm leading-relaxed mb-6">
        <h2 className="text-lg font-bold mb-4">
          Pernyataan Privasi & Penggunaan Data
        </h2>

        <p className="mb-4 text-sm leading-relaxed">
          Terima kasih telah menggunakan layanan{" "}
          <strong className="text-amber-600">Financial Check Up</strong> kami.
          Sebelum melanjutkan, kami ingin memastikan bahwa{" "}
          <strong className="text-amber-600">
            Privasi dan Keamanan Data Anda
          </strong>{" "}
          adalah prioritas utama kami.
        </p>

        <h3 className="font-bold mb-2 text-sm ">
          Data akan kami jamin sebagaimana:
        </h3>
        <ul className="list-decimal pl-6 text-sm space-y-2 mb-4">
          <li>
            <strong>Keamanan Data:</strong> Disimpan secara aman dan
            terlindungi.
          </li>
          <li>
            <strong>Penggunaan Data:</strong> Hanya untuk keperluan analisis
            oleh tim dibalikRuang.
          </li>
          <li>
            <strong>Kerahasiaan Data:</strong> Tidak dijual atau dibagikan ke
            pihak ketiga tanpa izin Anda.
          </li>
        </ul>

        <p className="text-sm mb-4">
          Dengan menekan tombol di bawah ini, Anda setuju terhadap pernyataan
          tersebut.
        </p>
      </div>

      <div className="pt-2 border-t-[1.3px] mb-4 flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          checked={consentGiven}
          onChange={handleCheckboxChange}
          className="mt-1 text-brand-orange"
        />
        <label htmlFor="consent" className="text-sm">
          Saya{" "}
          <strong className="text-brand-orange">
            menyetujui pernyataan privasi dan penggunaan data
          </strong>{" "}
          yang telah dijelaskan di atas dan memberikan izin kepada dibalikruang
          untuk mengumpulkan dan menggunakan data pribadi saya sesuai dengan
          kebijakan tersebut.
        </label>
      </div>

      <button
        type="button"
        disabled={!consentGiven}
        onClick={onConsentAccepted}
        className={`w-full py-3 rounded-lg font-medium transition ${
          consentGiven
            ? "bg-brand-orange text-white hover:bg-orange-400"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Mulai Cek Kondisi Finansial
      </button>
    </div>
  );
};

export default PrivacyConsentStep;
