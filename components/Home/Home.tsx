"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./Hero/Hero";
import Esential from "./Esential/Esential";
import FinancialAdvisor from "./FinancialAdvisor/FinancialAdvisor";
import Features from "./Features/Features";
import Review from "./Review/Review";
import Price from "./Price/Price";
import Offer from "./Offer/Offer";

const Home = () => {
  useEffect(() => {
    const initAOS = async () => {
      await import("aos");
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom",
      });
    };
    initAOS();
  }, []);

  return (
    <div className="overflow-hidden">
      <Hero />
      <Esential />
      <FinancialAdvisor />
      <Features />
      <Review />
      <Price />
      <Offer />
    </div>
  );
};

export default Home;
