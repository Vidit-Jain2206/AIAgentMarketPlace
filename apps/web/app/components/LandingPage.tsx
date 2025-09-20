"use client";
import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AgentsSection from "./AgentsSection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full border border-2-gray-800 overflow-hidden ">
      <Navbar />
      <HeroSection />
      <AgentsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
