"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import "./projects.css"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";



export default function OurProjects() {

   const { sectionRef, headingRef } = useHeadingAnimation();
   const [activeTab, setActiveTab] = useState("all");
   const [activeColor, setActiveColor] = useState(1);
   const containerRef = useRef<HTMLDivElement>(null);
   const colorContainerRef = useRef<HTMLDivElement>(null);
   const colorRefs = useRef<(HTMLDivElement | null)[]>([]);
  
   const [selectedYear, setSelectedYear] = useState('all');



  return (
    <section className=" w-full py-10 md:common-padding">

      {/* Heading */}
                     <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
                         <div ref={sectionRef} className="w-full">
                             <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto">
                                 <h2 className="text-h2 leading-none">Our <span className="font-subFont text-corinthiaHeading text-brown">projects</span></h2>
                                 
                             </div>
                         </div>
                     </div>  
      <div className="container">
        <div className="content ">

            {/* Tabs */}
            <div className="tab-outer flex justify-between w-full py-10">

              <div className="tab-outer-inner relative inline-flex rounded-full bg-theme/20 p-1.5 gap-1 text-18 leading-normal">


                  {/* All Tab */}
                <button
                  data-tab="colors"
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`relative z-10 py-2.5 px-5 rounded-full font-medium transition-colors duration-300 ${
                    activeTab === "all"
                      ? "bg-blue text-white"
                      : "text-neutral-500"
                  }`}
                >
               All
                </button>
                  {/* upcomming tab */}
                <button
                  data-tab="glass"
                  type="button"
                  onClick={() => setActiveTab("upcoming")}
                  className={`relative z-10 py-2.5 px-5 rounded-full font-medium transition-colors duration-300 ${
                    activeTab === "upcoming"
                      ? "bg-blue text-white"
                      : "text-neutral-500"
                  }`}
                >
                  Upcomming
                </button>
                
              </div>

    
               {/* Year Dropdown */}
            <div className="relative inline-flex items-center">
              <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-blue text-white py-3.5 pl-5 pr-10 outline-none rounded-full hover:bg-theme/30 transition-colors duration-300"
            >
              {/* Adding classes directly to the options */}
              <option value="all" className="bg-white text-neutral-800 py-2">Select Year</option>
              <option value="2026" className="bg-white text-neutral-800 py-2">2026</option>
              <option value="2025" className="bg-white text-neutral-800 py-2">2025</option>
            </select>
              
              {/* Custom Dropdown Arrow Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
                            

            </div>

        


            {/* All TAB*/}
            {activeTab === "all" && (

              <div
                ref={containerRef}
                className="studio-card-wrapper   gap-8"
              >

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                      

                      {/* Card 1 */}
                      <div className="card-1 group flex gap-3 bg-[#EFEAD473] rounded-xl p-2  overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] ">  
                        
                        {/* Image */}
                        <div className="w-[65%] overflow-hidden rounded-xl">
                          <Swiper
                            modules={[Pagination, Autoplay]}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                              delay: 3000,
                              disableOnInteraction: false,
                            }}
                            pagination={{
                              clickable: true,
                            }}
                            className="project-image-slider h-full"
                          >
                            <SwiperSlide>
                              <img
                                src="/images/projects-stories/galaxy-magnum-opus.png"
                                alt=""
                                className="w-full h-full object-cover rounded-xl"
                              />
                            </SwiperSlide>

                            <SwiperSlide>
                              <img
                                src="/images/projects-stories/prestige-jindal-city.png"
                                alt=""
                                className="w-full h-full object-cover rounded-xl"
                              />
                            </SwiperSlide>

                            <SwiperSlide>
                              <img
                                src="/images/projects-stories/prestige-lakeside-habitat.png"
                                alt=""
                                className="w-full h-full object-cover rounded-xl"
                              />
                            </SwiperSlide>

                          </Swiper>
                      </div>

                        {/* Content */}
                        <div className="content-wrapper w-[35%] p-4 flex flex-col bg-[#EFEAD4] rounded-xl">
                          <div className="top-content">
                            <p> Completion: 2022</p> 
                          </div>

                          <div className="mt-auto content-section">
                            <div className="mid-content">
                                <h3>
                                  Prestige Jindal City
                                </h3>
                                

                              <div className="flex items-center gap-2 mt-2 ">
                                <img
                                  src="/images/projects-stories/location.svg"
                                  alt="location"
                                  className=""
                                />
                                  <p>Bengaluru, Karnataka</p>   
                              </div>

                        

                            </div>

                            <div className="bottom-content space-y-1 text-sm ">
                              <p >G +29 Floors</p>
                              <p>15 Towers</p>
                              <p>Windows & Doors</p>
                              <p>Qty: 29,650</p>
                              <p>UPVC Series</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 2 */}
                     <div className="card-1 group flex gap-3 bg-[#EFEAD473] rounded-xl p-2  overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] ">
                        
                        {/* Image */}
                        <div className="w-[65%] overflow-hidden rounded-xl">
                          <img
                            src="/images/projects-stories/prestige-valley-crest.png"
                            alt="Prestige Jindal City"
                            className="w-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        {/* Content */}
                        <div className="content-wrapper w-[35%] p-4 flex flex-col bg-[#EFEAD4] rounded-xl">
                          <div className="top-content">
                            <p> Completion: 2022</p> 
                          </div>

                          <div className="mt-auto content-section">
                            <div className="mid-content">
                                <h3>
                                  Prestige Jindal City
                                </h3>
                                
                               <div className="flex items-center gap-2 mt-2 ">
                                <img
                                  src="/images/projects-stories/location.svg"
                                  alt="location"
                                  className=""
                                />
                                  <p>Bengaluru, Karnataka</p>   
                              </div>


                            </div>

                            <div className="bottom-content space-y-1 text-sm ">
                              <p >G +29 Floors</p>
                              <p>15 Towers</p>
                              <p>Windows & Doors</p>
                              <p>Qty: 29,650</p>
                              <p>UPVC Series</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 3 */}
                     <div className="card-1 group flex gap-3 bg-[#EFEAD473] rounded-xl p-2  overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] ">
                        
                        {/* Image */}
                        <div className="w-[65%] overflow-hidden rounded-xl">
                          <img
                            src="/images/projects-stories/prestige-lakeside-habitat.png"
                            alt="Prestige Jindal City"
                            className="w-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        {/* Content */}
                        <div className="content-wrapper w-[35%] p-4 flex flex-col bg-[#EFEAD4] rounded-xl">
                          <div className="top-content">
                            <p> Completion: 2022</p> 
                          </div>

                          <div className="mt-auto content-section">
                            <div className="mid-content">
                                <h3>
                                  Prestige Jindal City
                                </h3>

                               <div className="flex items-center gap-2 mt-2 ">
                                <img
                                  src="/images/projects-stories/location.svg"
                                  alt="location"
                                  className=""
                                />
                                  <p>Bengaluru, Karnataka</p>   
                              </div>

                                  

                            </div>

                            <div className="bottom-content space-y-1 text-sm ">
                              <p >G +29 Floors</p>
                              <p>15 Towers</p>
                              <p>Windows & Doors</p>
                              <p>Qty: 29,650</p>
                              <p>UPVC Series</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 4 */}
                      <div className="card-1 group flex gap-3 bg-[#EFEAD473] rounded-xl p-2  overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] ">
                        
                        {/* Image */}
                        <div className="w-[65%] overflow-hidden rounded-xl">
                          <img
                            src="/images/projects-stories/galaxy-magnum-opus.png"
                            alt="Prestige Jindal City"
                            className="w-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        {/* Content */}
                        <div className="content-wrapper w-[35%] p-4 flex flex-col bg-[#EFEAD4] rounded-xl">
                          <div className="top-content">
                            <p> Completion: 2022</p> 
                          </div>

                          <div className="mt-auto content-section">
                            <div className="mid-content">
                                <h3>
                                  Prestige Jindal City
                                </h3>
                                

                              <div className="flex items-center gap-2 mt-2 ">
                                <img
                                  src="/images/projects-stories/location.svg"
                                  alt="location"
                                  className=""
                                />
                                  <p>Bengaluru, Karnataka</p>   
                              </div>



                            </div>

                            <div className="bottom-content space-y-1 text-sm ">
                              <p >G +29 Floors</p>
                              <p>15 Towers</p>
                              <p>Windows & Doors</p>
                              <p>Qty: 29,650</p>
                              <p>UPVC Series</p>
                            </div>
                          </div>
                        </div>
                      </div>


               </div>

{/* Load More Button */}
<div className="flex justify-center mt-12">
  <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-6 py-3 rounded-full transition-all duration-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
    LOAD MORE
  </button>
</div>
                 
                
              </div>

            )}
            {/* uPCOMING */}
            {activeTab === "upcoming" && (

          <div
                ref={containerRef}
                className="studio-card-wrapper grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-10"
              >

                  {/* Card 1 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/project-stories/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 2 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/project-stories/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 3 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/project-stories/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>

                  {/* Card 4 */}
                  <div className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/project-stories/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                   

                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          
                          <h2 className="text-22">Fenesta Signature Studio Noida</h2>
                        </div>

                        <div className="card-caption">
                            
                      <p>Phasellus tincidunt arcu mauris, eleifend aliquam urna placerat id.</p>
                        </div>
   
                      </div>
                    </article>
                  </div>


              </div>
            )}
   




        </div>
      </div>
    </section>
  );
}