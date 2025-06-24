import {
  BrainCircuit,
  ChartColumn,
  Clock,
  FileDigit,
  Goal,
  Lightbulb,
  Scale,
  ShieldUser,
  TableOfContents,
} from "lucide-react";
import React from "react";

const Features = () => {
  const features = [
    {
      icon: <ChartColumn className="text-red-500" />,
      text: "Analisis Keuangan Otomatis",
    },
    {
      icon: <BrainCircuit className="text-blue-500" />,
      text: "Evaluasi 6 Aspek Keuangan Pribadi",
    },
    {
      icon: <FileDigit className="text-yellow-500" />,
      text: "Skor Kesehatan Finansial Otomatis",
    },
    {
      icon: <Scale className="text-purple-500" />,
      text: "Perbandingan dengan Kondisi Ideal",
    },
    {
      icon: <TableOfContents className="text-teal-500" />,
      text: "Laporan Ringkas & Informatif",
    },
    {
      icon: <Clock className="text-green-500" />,
      text: "Proses Cepat, Hasil Instan",
    },
    {
      icon: <Lightbulb className="text-pink-500" />,
      text: "Tingkatkan Literasi Keuanganmu",
    },
    {
      icon: <ShieldUser className="text-indigo-500" />,
      text: "Privasi dan Kerahasiaan Dijaga",
    },
    {
      icon: <Goal className="text-orange-500" />,
      text: "Rekomendasi Tindakan Nyata",
    },
  ];

  return (
    <div className="bg-pink-50 pt-20 pb-20">
      <div className="w-[80%] mx-auto text-center">
        <h1 className="mt-6 text-2xl md-text-3xl capitalize font-bold text-center">
          Its Everything you will be Needed
        </h1>

        <div className="grid mt-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              data-aos="flip-right"
              data-aos-anchor-placement="top-center"
              data-aos-delay={`${index * 100}`}
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md space-x-3"
            >
              <div className="text-3xl w-14 h-14 g-gray-800 bg-opacity-10 flex items-center justify-center flex-col rounded-full">
                <span>{feature.icon}</span>
              </div>
              <span className="font-semibold">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
