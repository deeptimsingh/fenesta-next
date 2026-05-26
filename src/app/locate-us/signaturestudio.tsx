"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { initCardReveal } from "@/components/base/cardReveal";
import Link from "next/link";
import FenestaButton from "@/components/base/FenestaButton";
import "./locateus.css";





export default function SignatureStudio() {

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");

  const handleSubmit = () => {
    console.log({ selectedCountry, selectedState, selectedCity, selectedBlock });
  };

 
  const [activeTab, setActiveTab] = useState("livingroom");

  const containerRef = useRef<HTMLDivElement>(null);
  const revealCtxRef = useRef<ReturnType<typeof initCardReveal> | null>(null);


  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealCtxRef.current?.revert();

        revealCtxRef.current = initCardReveal({
          container,
          cardSelector: ".cardreveal",
          imageSelector: ".cardreveal-image",
        });
      });
    });

    return () => {
      cancelAnimationFrame(id);
      revealCtxRef.current?.revert();
      revealCtxRef.current = null;
    };
  }, [activeTab]);

  return (
    <section className=" w-full content-over-banner ">
      <div className="container">
        <div className="content-inside ">

            {/* Tabs */}
            <div className="tab-outer flex justify-center w-full">

              <div className="tab-outer-inner relative inline-flex rounded-full bg-theme/20 p-1.5 gap-1 text-18 leading-normal">

                <button
                  data-tab="livingroom"
                  type="button"
                  onClick={() => setActiveTab("livingroom")}
                  className={`relative z-10 py-2.5 px-5 rounded-full font-medium transition-colors duration-300 ${
                    activeTab === "livingroom"
                      ? "bg-blue text-white"
                      : "text-neutral-500"
                  }`}
                >
                Visit our signature studios
                </button>

                <button
                  data-tab="luxury"
                  type="button"
                  onClick={() => setActiveTab("luxury")}
                  className={`relative z-10 py-2.5 px-5 rounded-full font-medium transition-colors duration-300 ${
                    activeTab === "luxury"
                      ? "bg-blue text-white"
                      : "text-neutral-500"
                  }`}
                >
                  Find a fenesta partner
                </button>

                

              </div>

            </div>

        
            {/* Filter Row */}
            <div className="flex flex-wrap items-end gap-4 filter-row">

              {/* Country */}
              <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
                <label className="label">
                  Country<span className="red-star">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-4xl px-4 py-2.5 pr-10 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer"
                  >
                    <option value="India">India</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Select State */}
              <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
                <label className="label">
                  State<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-4xl px-4 py-2.5 pr-10 text-sm bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer"
                  >
                    <option value="">Select state</option>
                    <option value="up">Uttar Pradesh</option>
                    <option value="mh">Maharashtra</option>
                    <option value="ka">Karnataka</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Select City */}
              <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
                <label className="label">
                  Select city<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-4xl px-4 py-2.5 pr-10 text-sm bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer"
                  >
                    <option value="">City</option>
                    <option value="noida">Noida</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Select Block */}
              <div className="flex flex-col gap-1 flex-1 min-w-[160px]">
                <label className="label">
                  Select block<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedBlock}
                    onChange={(e) => setSelectedBlock(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-4xl px-4 py-2.5 pr-10 text-sm bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00aeef] cursor-pointer"
                  >
                    <option value="">Block</option>
                    <option value="block-a">Block A</option>
                    <option value="block-b">Block B</option>
                    <option value="block-c">Block C</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Submit */}
                        <div className="mt-5 z-1 text-center">
                <FenestaButton>Submit</FenestaButton>
              </div>  

            </div>

            {/* Living Room Cards */}
            {activeTab === "livingroom" && (

              <div
                ref={containerRef}
                className="studio-card-wrapper grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-5"
              >


                  {/* Card 1 */}
                  <Link href="/studios/noida-1" className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute bottom-0 left-0 w-full w-full bg-black/45 px-5 py-10 " />
                        <div className=" image-caption">
                          <p>Noida</p>
                          <h3>Fenesta signature studio</h3>
                        </div>
                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          <img src="/images/locateus/contact-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>Contact person: <strong className="contact-person-name">Poonam Bisht</strong></span>
                        </div>
                        <div className="card-caption">
                          <img src="/images/locateus/phone-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>1800 102 9880</span>
                        </div>
                        <div className="card-caption">
                            <img src="/images/locateus/mail-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>response@fenesta.com</span>
                        </div>
                        <div className="card-caption">
                              <img src="/images/locateus/address-icon.png" alt="Contact Person" className="mt-0.5 shrink-0" />
                          <span className="leading-relaxed">Fenesta studio, the GIP mall 2nd floor,shop no 209 secor 38, noida- 201301. near sector 18 metro station, utttar pradesh</span>
                        </div>
                      </div>
                    </article>
                  </Link>

                  {/* Card 2 */}
                  <Link href="/studios/noida-1" className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute bottom-0 left-0 w-full w-full bg-black/45 px-5 py-10 " />
                        <div className=" image-caption">
                          <p>Noida</p>
                          <h3>Fenesta signature studio</h3>
                        </div>
                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          <img src="/images/locateus/contact-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>Contact person: <strong className="contact-person-name">Poonam Bisht</strong></span>
                        </div>
                        <div className="card-caption">
                          <img src="/images/locateus/phone-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>1800 102 9880</span>
                        </div>
                        <div className="card-caption">
                            <img src="/images/locateus/mail-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>response@fenesta.com</span>
                        </div>
                        <div className="card-caption">
                              <img src="/images/locateus/address-icon.png" alt="Contact Person" className="mt-0.5 shrink-0" />
                          <span className="leading-relaxed">Fenesta studio, the GIP mall 2nd floor,shop no 209 secor 38, noida- 201301. near sector 18 metro station, utttar pradesh</span>
                        </div>
                      </div>
                    </article>
                  </Link>

                  {/* Card 3 */}
                  <Link href="/studios/noida-1" className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute bottom-0 left-0 w-full w-full bg-black/45 px-5 py-10 " />
                        <div className=" image-caption">
                          <p>Noida</p>
                          <h3>Fenesta signature studio</h3>
                        </div>
                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          <img src="/images/locateus/contact-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>Contact person: <strong className="contact-person-name">Poonam Bisht</strong></span>
                        </div>
                        <div className="card-caption">
                          <img src="/images/locateus/phone-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>1800 102 9880</span>
                        </div>
                        <div className="card-caption">
                            <img src="/images/locateus/mail-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>response@fenesta.com</span>
                        </div>
                        <div className="card-caption">
                              <img src="/images/locateus/address-icon.png" alt="Contact Person" className="mt-0.5 shrink-0" />
                          <span className="leading-relaxed">Fenesta studio, the GIP mall 2nd floor,shop no 209 secor 38, noida- 201301. near sector 18 metro station, utttar pradesh</span>
                        </div>
                      </div>
                    </article>
                  </Link>

                  {/* Card 4 */}
                  <Link href="/studios/noida-1" className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute bottom-0 left-0 w-full w-full bg-black/45 px-5 py-10 " />
                        <div className=" image-caption">
                          <p>Noida</p>
                          <h3>Fenesta signature studio</h3>
                        </div>
                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          <img src="/images/locateus/contact-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>Contact person: <strong className="contact-person-name">Poonam Bisht</strong></span>
                        </div>
                        <div className="card-caption">
                          <img src="/images/locateus/phone-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>1800 102 9880</span>
                        </div>
                        <div className="card-caption">
                            <img src="/images/locateus/mail-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>response@fenesta.com</span>
                        </div>
                        <div className="card-caption">
                              <img src="/images/locateus/address-icon.png" alt="Contact Person" className="mt-0.5 shrink-0" />
                          <span className="leading-relaxed">Fenesta studio, the GIP mall 2nd floor,shop no 209 secor 38, noida- 201301. near sector 18 metro station, utttar pradesh</span>
                        </div>
                      </div>
                    </article>
                  </Link>

        

              </div>

            )}

            {/* Luxury Interior Cards */}
            {activeTab === "luxury" && (

          <div
                ref={containerRef}
                className="studio-card-wrapper grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-5"
              >

                  {/* Card 1 */}
                  <Link href="/studios/noida-1" className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute bottom-0 left-0 w-full w-full bg-black/50 px-5 py-10 " />
                        <div className=" image-caption">
                          <p>Noida</p>
                          <h3>Fenesta signature studio</h3>
                        </div>
                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          <img src="/images/locateus/contact-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>Contact person: <strong className="contact-person-name">Poonam Bisht</strong></span>
                        </div>

                        <div className="card-caption">
                              <img src="/images/locateus/address-icon.png" alt="Contact Person" className="mt-0.5 shrink-0" />
                          <span className="leading-relaxed">Fenesta studio, the GIP mall 2nd floor,shop no 209 secor 38, noida- 201301. near sector 18 metro station, utttar pradesh</span>
                        </div>
                             {/* Submit */}
                        <div className="mt-2 z-1 ">
                         <FenestaButton>Contact Partner</FenestaButton>
                       </div>  
                            {/* Submit */}
                        <div className=" z-1 ">
                         <FenestaButton>Enquire now</FenestaButton>
                      </div>  
                      </div>
                    </article>
                  </Link>

                  {/* Card 2 */}
                  <Link href="/studios/noida-1" className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute bottom-0 left-0 w-full w-full bg-black/50 px-5 py-10 " />
                        <div className=" image-caption">
                          <p>Noida</p>
                          <h3>Fenesta signature studio</h3>
                        </div>
                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          <img src="/images/locateus/contact-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>Contact person: <strong className="contact-person-name">Poonam Bisht</strong></span>
                        </div>

                        <div className="card-caption">
                              <img src="/images/locateus/address-icon.png" alt="Contact Person" className="mt-0.5 shrink-0" />
                          <span className="leading-relaxed">Fenesta studio, the GIP mall 2nd floor,shop no 209 secor 38, noida- 201301. near sector 18 metro station, utttar pradesh</span>
                        </div>
                             {/* Submit */}
                        <div className="mt-2 z-1 ">
                         <FenestaButton>Contact Partner</FenestaButton>
                       </div>  
                            {/* Submit */}
                        <div className=" z-1 ">
                         <FenestaButton>Enquire now</FenestaButton>
                      </div>  
                      </div>
                    </article>
                  </Link>

                  {/* Card 3 */}
                  <Link href="/studios/noida-1" className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute bottom-0 left-0 w-full w-full bg-black/50 px-5 py-10 " />
                        <div className=" image-caption">
                          <p>Noida</p>
                          <h3>Fenesta signature studio</h3>
                        </div>
                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          <img src="/images/locateus/contact-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>Contact person: <strong className="contact-person-name">Poonam Bisht</strong></span>
                        </div>

                        <div className="card-caption">
                              <img src="/images/locateus/address-icon.png" alt="Contact Person" className="mt-0.5 shrink-0" />
                          <span className="leading-relaxed">Fenesta studio, the GIP mall 2nd floor,shop no 209 secor 38, noida- 201301. near sector 18 metro station, utttar pradesh</span>
                        </div>
                             {/* Submit */}
                        <div className="mt-2 z-1 ">
                         <FenestaButton>Contact Partner</FenestaButton>
                       </div>  
                            {/* Submit */}
                        <div className=" z-1 ">
                         <FenestaButton>Enquire now</FenestaButton>
                      </div>  
                      </div>
                    </article>
                  </Link>

                  {/* Card 4 */}
                  <Link href="/studios/noida-1" className="group block cursor-pointer studio-card">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-lg transition-all duration-500">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <Image
                          src="/images/locateus/studio-1.png"
                          alt="Fenesta Signature Studio Noida"
                          width={600}
                          height={400}
                          className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className="absolute bottom-0 left-0 w-full w-full bg-black/50 px-5 py-10 " />
                        <div className=" image-caption">
                          <p>Noida</p>
                          <h3>Fenesta signature studio</h3>
                        </div>
                      </div>
                      <div className="card-caption-wrapper">
                        <div className=" card-caption" >
                          <img src="/images/locateus/contact-icon.png" alt="Contact Person" className="mt-0.5  shrink-0" />
                          <span>Contact person: <strong className="contact-person-name">Poonam Bisht</strong></span>
                        </div>

                        <div className="card-caption">
                              <img src="/images/locateus/address-icon.png" alt="Contact Person" className="mt-0.5 shrink-0" />
                          <span className="leading-relaxed">Fenesta studio, the GIP mall 2nd floor,shop no 209 secor 38, noida- 201301. near sector 18 metro station, utttar pradesh</span>
                        </div>
                             {/* Submit */}
                        <div className="mt-2 z-1 ">
                         <FenestaButton>Contact Partner</FenestaButton>
                       </div>  
                            {/* Submit */}
                        <div className=" z-1 ">
                         <FenestaButton>Enquire now</FenestaButton>
                      </div>  
                      </div>
                    </article>
                  </Link>


              </div>
            )}



              <div className="mt-5 z-1 text-center">
                <FenestaButton>View More</FenestaButton>
              </div>  

        </div>
      </div>
    </section>
  );
}