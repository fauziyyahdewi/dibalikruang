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
            image="/images/dibalikruang-logo.png"
            title="Dibalik Ruang"
            description="Dibalik Ruang adalah sebuah aplikasi yang dapat membantu Anda untuk menentukan ruang yang tepat untuk pergi ke rumah tanpa menghabiskan waktu dan banyak uang. Dengan menggunakan fitur ini, Anda dapat memilih ruang yang tepat dengan lebih sedikit biaya dan kemudahan."
            linkText="Start Earning"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay="100"
        >
          <EsentialCard
            image="/images/dibalikruang-logo.png"
            title="Dibalik Ruang"
            description="Dibalik Ruang adalah sebuah aplikasi yang dapat membantu Anda untuk menentukan ruang yang tepat untuk pergi ke rumah tanpa menghabiskan waktu dan banyak uang. Dengan menggunakan fitur ini, Anda dapat memilih ruang yang tepat dengan lebih sedikit biaya dan kemudahan."
            linkText="Start Earning"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay="200"
        >
          <EsentialCard
            image="/images/dibalikruang-logo.png"
            title="Dibalik Ruang"
            description="Dibalik Ruang adalah sebuah aplikasi yang dapat membantu Anda untuk menentukan ruang yang tepat untuk pergi ke rumah tanpa menghabiskan waktu dan banyak uang. Dengan menggunakan fitur ini, Anda dapat memilih ruang yang tepat dengan lebih sedikit biaya dan kemudahan."
            linkText="Start Earning"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay="300"
        >
          <EsentialCard
            image="/images/dibalikruang-logo.png"
            title="Dibalik Ruang"
            description="Dibalik Ruang adalah sebuah aplikasi yang dapat membantu Anda untuk menentukan ruang yang tepat untuk pergi ke rumah tanpa menghabiskan waktu dan banyak uang. Dengan menggunakan fitur ini, Anda dapat memilih ruang yang tepat dengan lebih sedikit biaya dan kemudahan."
            linkText="Start Earning"
          />
        </div>
      </div>
    </div>
  );
};

export default Esential;
