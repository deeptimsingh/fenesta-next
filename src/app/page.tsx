"use client";

import HeroSlider from "@/app/home/HeroSlider";
import BeginJourney from "@/app/home/BeginJourney";
import WindowDoorSection from "@/app/home/WindowDoorSection";
import TrustedPartners from "@/app/home/TrustedPartners";
import ClientStories from "@/app/home/ClientStories";
import VisitQuick from "@/app/home/visitquick";
import Seeitlikeyourethere from "@/app/home/Seeitlikeyourethere";
import FenestaEdit from "@/app/home/FenestaEdit";
import ProjectsSlider from "@/app/home/ProjectsSlider";
import CircularSliders from "@/app/home/CircularSliders";
import "@/app/home/homepage-style.css";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <BeginJourney />
      <WindowDoorSection />
      <ProjectsSlider />      
      <CircularSliders />
      <TrustedPartners />        
      <ClientStories /> 
      <VisitQuick />      
      <Seeitlikeyourethere />
      <FenestaEdit />
    </main>
  );
}

