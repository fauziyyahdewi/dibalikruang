import React from "react";
import EsentialCard from "./EsentialCard";

const Esential = () => {
  return (
    <div className="pt-16 pb-16">
      {/* Title */}
      <h1 className="mt-6 text-2xl md:text-3xl capitalize font-bold text-center">
        Kenapa cek finansial itu penting?
      </h1>

      {/* Content */}
      <div className="mt-20 grid w-[90%] mx-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
        <div data-aos="fade-up" data-aos-anchor-placement="top-center">
          <EsentialCard
            image="/images/esensial-1.png"
            title="Tahu Posisi Keuangan Saat Ini"
            description="Membantu memahami jumlah aset, utang, dan arus kas agar bisa mengambil keputusan keuangan yang tepat."
            linkText="Ketahui Lebih Lanjut"
            link="https://www.investopedia.com/articles/investing/061916/what-best-measure-companys-financial-health.asp"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay="100"
        >
          <EsentialCard
            image="/images/esensial-2.png"
            title="Deteksi Masalah Finansial"
            description="Mengungkap potensi masalah seperti utang berlebih atau pengeluaran yang tidak terkendali sejak dini."
            linkText="Ketahui Lebih Lanjut"
            link="https://allworthfinancial.com/articles/5-key-reasons-net-worth-important"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay="200"
        >
          <EsentialCard
            image="/images/esensial-3.png"
            title="Rencanakan Tujuan"
            description="Memberi gambaran yang jelas untuk menyusun rencana keuangan jangka pendek maupun panjang."
            linkText="Ketahui Lebih Lanjut"
            link="https://www.ameripriseadvisors.com/team/insight-financial-advisors/insights/financial-health-check"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay="300"
        >
          <EsentialCard
            image="/images/esensial-4.png"
            title="Bangun Kebiasaan Sehat"
            description="Mendorong disiplin dalam mencatat, mengatur, dan mengevaluasi keuangan secara berkala."
            linkText="Ketahui Lebih Lanjut"
            link="https://www.investopedia.com/articles/personal-finance/100516/setting-financial-goals"
          />
        </div>
      </div>
    </div>
  );
};

export default Esential;
