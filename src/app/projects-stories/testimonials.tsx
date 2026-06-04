import { useState, useEffect } from "react";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

export default function Testimonials() {

const { sectionRef, headingRef } = useHeadingAnimation();

const [isOpen, setIsOpen] = useState(false);
const [videoSrc, setVideoSrc] = useState("");

const openVideo = (video: string) => {
  setVideoSrc(video);
  setIsOpen(true);
};

 useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  document.addEventListener("keydown", handleEsc);

  return () => {
    document.removeEventListener("keydown", handleEsc);
  };
}, []);

  return (
    <>
      <section className="py-16">
                  {/* Heading */}
                     <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                         <div ref={sectionRef} className="w-full">
                             <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                                 <h2 className="text-h2 leading-none">All  <span className="font-subFont text-corinthiaHeading text-brown">testimonials</span></h2>
                                 
                             </div>
                         </div>
                     </div>  

        <div className="container mx-auto px-4 py-16">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* CARD */}
            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500">

              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() =>
                  openVideo("https://www.w3schools.com/html/mov_bbb.mp4")
                }
              >
                <img
                  src="/images/projects-stories/mithuna-construction.png"
                  alt="testimonial"
                  className="w-full  object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full backdrop-blur-sm  flex items-center justify-center">
                    <img
                      src="/images/projects-stories/play-icon.svg"
                      alt="play"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                
                <h3 className="font-semibold ">
                  Mithuna Construction
                </h3>

                <div className="flex items-center gap-2 mt-2 testimonial-content">
                  <img
                    src="/images/projects-stories/location.svg"
                    alt="location"
                    className=""
                  />
                 <p>Bengaluru</p> 
                </div>
              </div>
            </div>
            {/* CARD */}
            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500">

              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() =>
                  openVideo("https://www.w3schools.com/html/mov_bbb.mp4")
                }
              >
                <img
                  src="/images/projects-stories/aknova-realtech.png"
                  alt="testimonial"
                  className="w-full  object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full backdrop-blur-sm  flex items-center justify-center">
                    <img
                      src="/images/projects-stories/play-icon.svg"
                      alt="play"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold ">
                  Aknova Realtech
                </h3>

                <div className="flex items-center gap-2 mt-2 testimonial-content">
                  <img
                    src="/images/projects-stories/location.svg"
                    alt="location"
                    className=""
                  />
                <p>Dehradun</p>  
                </div>
              </div>
            </div>
            {/* CARD */}
            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500">

              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() =>
                  openVideo("https://www.w3schools.com/html/mov_bbb.mp4")
                }
              >
                <img
                  src="/images/projects-stories/ortiva-realty.png"
                  alt="testimonial"
                  className="w-full  object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full backdrop-blur-sm  flex items-center justify-center">
                    <img
                      src="/images/projects-stories/play-icon.svg"
                      alt="play"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold ">
                 Ortiva Realty & Developers Pvt. Ltd.
                </h3>

                <div className="flex items-center gap-2 mt-2 testimonial-content">
                  <img
                    src="/images/projects-stories/location.svg"
                    alt="location"
                    className=""
                  />
                    <p>South Delhi</p>   
                </div>
              </div>
            </div>
            {/* CARD */}
            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500">

              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() =>
                  openVideo("https://www.w3schools.com/html/mov_bbb.mp4")
                }
              >
                <img
                  src="/images/projects-stories/aknova-realtech.png"
                  alt="testimonial"
                  className="w-full  object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full backdrop-blur-sm  flex items-center justify-center">
                    <img
                      src="/images/projects-stories/play-icon.svg"
                      alt="play"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold">
                  AKNOVA REALTECH
                </h3>

                <div className="flex items-center gap-2 mt-2 testimonial-content">
                  <img
                    src="/images/projects-stories/location.svg"
                    alt="location"
                    className=""
                  />
                 <p>Dehradun</p> 
                </div>
              </div>
            </div>
            {/* CARD */}
            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500">

              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() =>
                  openVideo("https://www.w3schools.com/html/mov_bbb.mp4")
                }
              >
                <img
                  src="/images/projects-stories/rajniwas-realtors.png"
                  alt="testimonial"
                  className="w-full  object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full backdrop-blur-sm  flex items-center justify-center">
                    <img
                      src="/images/projects-stories/play-icon.svg"
                      alt="play"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold ">
                  Rajniwas realtors
                </h3>

                <div className="flex items-center gap-2 mt-2 testimonial-content ">
                  <img
                    src="/images/projects-stories/location.svg"
                    alt="location"
                    className=""
                  />
                 <p>Allahabad</p> 
                </div>
              </div>
            </div>
            {/* CARD */}
            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500">

              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() =>
                  openVideo("https://www.w3schools.com/html/mov_bbb.mp4")
                }
              >
                <img
                  src="/images/projects-stories/aradhana-builders.png"
                  alt="testimonial"
                  className="w-full  object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full backdrop-blur-sm  flex items-center justify-center">
                    <img
                      src="/images/projects-stories/play-icon.svg"
                      alt="play"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold ">
                  Aradhana Builders
                </h3>

                <div className="flex items-center gap-2 mt-2 testimonial-content ">
                  <img
                    src="/images/projects-stories/location.svg"
                    alt="location"
                    className=""
                  />
                <p>Rishikesh</p>  
                </div>
              </div>
            </div>

            {/* Duplicate card here */}

          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl animate-scaleIn"
          >
                {/* Close */}
                <button
                onClick={() => setIsOpen(false)}
                className="group absolute -top-14 right-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                </button>

            {/* Video */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full max-h-[80vh]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}