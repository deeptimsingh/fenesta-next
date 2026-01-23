"use client";
import HeroSlider from "@/app/home/HeroSlider";
import TrustedPartners from "@/app/home/TrustedPartners";
import ClientStories from "@/app/home/ClientStories";
import VisitQuick from "@/app/home/visitquick";
import Seeitlikeyourethere from "@/app/home/Seeitlikeyourethere";
import FenestaEdit from "@/app/home/FenestaEdit";
import WindowDoorSection from "@/app/home/WindowDoorSection";
import ProjectsSlider from "@/app/home/ProjectsSlider";
// import FirstVisitToFinalFit from "@/app/home/firstVisitToFnalFit";
import CircularSliders from "@/app/home/CircularSliders";




export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <WindowDoorSection />
      <ProjectsSlider />
      {/* <FirstVisitToFinalFit /> */}
      <CircularSliders />
      <TrustedPartners />        
      <ClientStories /> 
      <VisitQuick />      
      <Seeitlikeyourethere />
      <FenestaEdit />
    </main>
  );
}

