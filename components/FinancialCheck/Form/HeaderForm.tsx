import Image from "next/image";
import React from "react";

const stepInfo = [
  {
    image: "/images/income.svg",
    title: "Pendapatan",
    textStart: "Berapa",
    point: "penghasilan",
    textEnd: "Anda perbulan?",
    color: "text-emerald-600",
  },
  {
    image: "/images/income.svg",
    title: "Pengeluaran",
    textStart: "Berapa",
    point: "pengeluaran",
    textEnd: "Anda dalam satu bulan?",
    color: "text-red-600",
  },
  {
    image: "/images/income.svg",
    title: "Tabungan",
    textStart: "Berapa Anda menyisihkan dana untuk",
    point: "tabungan",
    textEnd: "dalam satu bulan dan berapa total yang terkumpul saat ini?",
    color: "text-green-600",
  },
  {
    image: "/images/income.svg",
    title: "Investasi",
    textStart: "Sudah punya produk",
    point: "investasi",
    textEnd: "apa saja?",
    color: "text-blue-600",
  },
  {
    image: "/images/income.svg",
    title: "Aset",
    textStart: "Apa saja",
    point: "aset",
    textEnd: "yang Anda miliki?",
    color: "text-purple-600",
  },
  {
    image: "/images/income.svg",
    title: "Hutang",
    textStart: "Berapa",
    point: "hutang",
    textEnd: "yang Anda miliki?",
    color: "text-yellow-600",
  },
];

const HeaderForm = ({ step }: { step: number }) => {
  const info = stepInfo[step] ?? { icon: "❓", title: "Langkah Tidak Dikenal" };

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-amber-100 rounded-full p-2">
        <Image
          src={info.image}
          alt={info.title}
          width={32}
          height={32}
          className="h-8 w-8"
        />
      </div>
      <h2 className="text-xl md:text-2xl font-semibold">
        {info.textStart} <span className={`${info.color}`}>{info.point}</span>{" "}
        {info.textEnd}
      </h2>
    </div>
  );
};

export default HeaderForm;
