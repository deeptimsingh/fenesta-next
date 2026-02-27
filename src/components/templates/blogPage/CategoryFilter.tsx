"use client";
import { useRef, useState, useEffect, CSSProperties } from "react";
import Image from "next/image";

import { initCardReveal } from "@/components/base/cardReveal";

const BLOG_OPTIONS = [
  { value: "all", label: "All" },
  { value: "windows", label: "Windows & doors" },
  { value: "home", label: "Home decor" },
  { value: "architecture", label: "Architecture & design" },
  { value: "eco", label: "Eco-friendly home" },
  { value: "smart", label: "Smart city" },
  { value: "corporate", label: "Corporate newsroom" },
] as const;

export default function CategoryTabs() {
  const [active, setActive] = useState("all");
  const [highlightStyle, setHighlightStyle] = useState<CSSProperties>({});
  const tabContainerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  /* Card reveal animation — only when "all" tab is visible */
  useEffect(() => {
    if (active !== "all") return;
    if (!cardsContainerRef.current) return;

    const ctx = initCardReveal({
      container: cardsContainerRef.current,
      cardSelector: ".reveal-card",
      imageSelector: ".card-image",
    });

    return () => ctx?.revert();
  }, [active]);

  /* ============================================================
  MOVING HIGHLIGHT BAR
  ============================================================ */
  const updateHighlight = (id: string) => {
    const el = document.getElementById(id);
    const container = tabContainerRef.current;
    if (!el || !container) return;

    const elRect = el.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();

    setHighlightStyle({
      width: `${elRect.width}px`,
      transform: `translateX(${elRect.left - parentRect.left}px)`
    });
  };

  useEffect(() => {
    updateHighlight(active);
    const onResize = () => updateHighlight(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);


  useEffect(() => {
    const updateOffset = () => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const headerHeight = header.offsetHeight;
    const offset = headerHeight + 10; // spacing below header

    document.documentElement.style.setProperty("--header-offset", `${offset}px`);
  };

  updateOffset();
  window.addEventListener("resize", updateOffset);
  return () => window.removeEventListener("resize", updateOffset);
  }, []);


  /* ============================================================
  DRAG + SWIPE SCROLL
  ============================================================ */

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const startDrag = (e: React.MouseEvent) => {
    const el = tabContainerRef.current;
    if (!el) return;
    isDragging = true;
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  };

  const onDrag = (e: React.MouseEvent) => {
    const el = tabContainerRef.current;
    if (!el || !isDragging) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.3;
    el.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => { isDragging = false; };

  const startTouch = (e: React.TouchEvent) => {
    const el = tabContainerRef.current;
    if (!el) return;
    isDragging = true;
    startX = e.touches[0].pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  };

  const onTouchDrag = (e: React.TouchEvent) => {
    const el = tabContainerRef.current;
    if (!el || !isDragging) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startX) * 1.3;
    el.scrollLeft = scrollLeft - walk;
  };




  

  return (
    <div ref={cardsContainerRef} className="w-full">

      {/* ====================== DESKTOP TABS ======================= */}
     <div
        ref={tabContainerRef}
        className=" tab-sticky relative hidden md:flex items-center justify-between gap-3 md:gap-[0.75vw] bg-theme/10 bg-darkBase  p-2
  rounded-[50px] overflow-x-auto whitespace-nowrap no-scrollbar cursor-grab"
        onMouseDown={startDrag} onMouseMove={onDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}  onTouchStart={startTouch}
        onTouchMove={onTouchDrag}  onTouchEnd={stopDrag}>
        {/* MOVING HIGHLIGHT BAR */}
        <div
          className="absolute top-2 bottom-2 bg-theme  rounded-full transition-all duration-300 inset-0"
          style={highlightStyle}
        />

        {/* ALL */}
        <button
          id="all"
          onClick={() => setActive("all")}
          className={`relative z-10 flex items-center  py-3 rounded-[50px] h-[50px] text-basexs leading-tight
            ${active === "all" ? "text-white" : "bg-white bg-lightBase text-gray-800"}`}>
          <span className="text-left">All</span>
        </button>

        {/* WINDOWS */}
        <button
          id="windows"
          onClick={() => setActive("windows")}
          className={`relative z-10 flex items-center  py-3 rounded-[50px] h-[50px] text-basexs leading-tight
            ${active === "windows" ? "text-white" : "bg-white text-gray-800"}`}>
          <Image src="/images/blog/icons/icon1.svg" width={20} height={20} alt="" />
          <span className="text-left">Windows<br />& doors</span>
        </button>

        {/* HOME */}
        <button
          id="home"
          onClick={() => setActive("home")}
          className={`relative z-10 flex items-center  py-3 rounded-[50px] h-[50px] text-basexs leading-tight
            ${active === "home" ? "text-white" : "bg-white text-gray-800"}`}>
          <Image src="/images/blog/icons/icon2.svg" width={20} height={20} alt="" />
          <span className="text-left">Home<br />decor</span>
        </button>

        {/* ARCHITECTURE */}
        <button
          id="architecture"
          onClick={() => setActive("architecture")}
          className={`relative z-10 flex items-center  py-3 rounded-[50px] h-[50px] text-basexs leading-tight
            ${active === "architecture" ? "text-white" : "bg-white text-gray-800"}`}>
          <Image src="/images/blog/icons/icon3.svg" width={20} height={20} alt="" />
          <span className="text-left">Architecture<br />& design</span>
        </button>

        {/* ECO */}
        <button
          id="eco"
          onClick={() => setActive("eco")}
          className={`relative z-10 flex items-center  py-3 rounded-[50px] h-[50px] text-basexs leading-tight
            ${active === "eco" ? "text-white" : "bg-white text-gray-800"}`}>
          <Image src="/images/blog/icons/icon4.svg" width={20} height={20} alt="" />
          <span className="text-left">Eco-friendly<br />home</span>
        </button>

        {/* SMART */}
        <button
          id="smart"
          onClick={() => setActive("smart")}
          className={`relative z-10 flex items-center  py-3 rounded-[50px] h-[50px] text-basexs leading-tight
            ${active === "smart" ? "text-white" : "bg-white text-gray-800"}`}>
          <Image src="/images/blog/icons/icon5.svg" width={20} height={20} alt="" />
          <span className="text-left">Smart<br />city</span>
        </button>

        {/* CORPORATE */}
        <button
          id="corporate"
          onClick={() => setActive("corporate")}
          className={`relative z-10 flex items-center  py-3 rounded-[50px] h-[50px] text-basexs leading-tight
            ${active === "corporate" ? "text-white" : "bg-white text-gray-800"}`}>
          <Image src="/images/blog/icons/icon6.svg" width={20} height={20} alt="" />
          <span className="text-left">Corporate<br />newsroom</span>
        </button>
      </div>

      {/* ====================== MOBILE CUSTOM SELECT ======================= */}
      <div className="md:hidden mt-3">
        <CustomSelect value={active} onChange={setActive} options={BLOG_OPTIONS} />
      </div>

      {/* ====================== TAB CONTENT — USING ID ======================= */}

      <div className="mt-6 animate-slideUp ">
        <div id="content-all" className={`${active === "all" ? "block" : "hidden"}`}>
          <div className="tab-content-in">
              <div className="grid md:grid-cols-2 gap-8">
                  {/* ------- CARD 1 ------- */}
                  <div className="reveal-card bg-white bg-lightdarkbase rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-md ">
                    {/* Image */}
                    <div className="reveal-img-wrapper relative h-56 w-full overflow-hidden">                    
                      <Image
                        src="/images/blog/windowDoorImg1.webp"
                        alt="Door Designs"
                        fill
                        className="object-cover reveal-img card-image"
                      />
                      {/* Tag */}
                     <span className="absolute top-3 right-3 bg-[#ffffffcc]  text-14 font-semibold px-3 py-1 rounded-full shadow">
                        Windows & doors
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-14 text-theme/70 justify-between">
                        <div className="flex items-center gap-2">
                        <Image
                            src="/images/blog/calender-icon.svg"
                            alt="calendar icon"
                            width={16}
                            height={16}
                          /> Nov 18, 2025
                        </div>

                        <div className="flex items-center gap-1">
                          <Image
                            src="/images/blog/clock-icon.svg"
                            alt="calendar icon"
                            width={16}
                            height={16}
                          /> 9 Min Read
                        </div>
                      </div>

                      <p className="mt-3 text-18 font-bold leading-tight text-gray-900">              
                        Trendy and Functional Door Designs for Homes in 2025
                      </p>
                    </div>
                  </div>

                  {/* ------- CARD 2 ------- */}
                  <div className="reveal-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md ">
                    {/* Image */}
                    <div className="reveal-img-wrapper relative h-56 w-full overflow-hidden">
                      <Image
                        src="/images/blog/windowDoorImg2.webp"
                        alt="Glass Window Tips"
                        fill
                        className="object-cover reveal-img card-image"
                      />

                      {/* Tag */}
                      <span className="absolute top-3 right-3 bg-[#ffffffcc]  text-14 font-semibold px-3 py-1 rounded-full shadow">
                      Architecture & design
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-14 text-theme/70 justify-between">
                        <div className="flex items-center gap-1">
                          <Image
                            src="/images/blog/calender-icon.svg"
                            alt="calendar icon"
                            width={16}
                            height={16}
                          /> 
                          Oct 30, 2025
                        </div>

                        <div className="flex items-center gap-1">
                            <Image
                            src="/images/blog/clock-icon.svg"
                            alt="clock icon"
                            width={16}
                            height={16}
                          /> 
                          4 Min Read
                        </div>
                      </div>

                      <p className="mt-3 text-18 font-bold leading-tight text-gray-900">
                        Design Tips: Using Glass Windows to Create a Spacious Look
                      </p>
                    </div>
                  </div>


                  {/* ------- CARD 3 ------- */}
                  <div className="reveal-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md ">
                    {/* Image */}
                    <div className="reveal-img-wrapper relative h-56 w-full overflow-hidden">                    
                      <Image
                        src="/images/blog/windowDoorImg1.webp"
                        alt="Door Designs"
                        fill
                        className="object-cover reveal-img card-image"
                      />
                      {/* Tag */}
                     <span className="absolute top-3 right-3 bg-[#ffffffcc]  text-14 font-semibold px-3 py-1 rounded-full shadow tag-item">
                        Windows & doors
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-14 text-theme/70 justify-between">
                        <div className="flex items-center gap-2">
                        <Image
                            src="/images/blog/calender-icon.svg"
                            alt="calendar icon"
                            width={16}
                            height={16}
                          /> Nov 18, 2025
                        </div>

                        <div className="flex items-center gap-1">
                          <Image
                            src="/images/blog/clock-icon.svg"
                            alt="calendar icon"
                            width={16}
                            height={16}
                          /> 9 Min Read
                        </div>
                      </div>

                      <p className="mt-3 text-18 font-bold leading-tight text-gray-900">              
                        Trendy and Functional Door Designs for Homes in 2025
                      </p>
                    </div>
                  </div>

                  {/* ------- CARD 4 ------- */}
                  <div className="reveal-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md ">
                    {/* Image */}
                    <div className="reveal-img-wrapper relative h-56 w-full overflow-hidden">
                      <Image
                        src="/images/blog/windowDoorImg2.webp"
                        alt="Glass Window Tips"
                        fill
                        className="object-cover reveal-img card-image"
                      />

                      {/* Tag */}                     
                      <span className="absolute top-3 right-3 bg-[#ffffffcc]  text-14 font-semibold px-3 py-1 rounded-full shadow tag-item">
                        Architecture & design
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-14 text-theme/70 justify-between">
                        <div className="flex items-center gap-1">
                          <Image
                            src="/images/blog/calender-icon.svg"
                            alt="calendar icon"
                            width={16}
                            height={16}
                          /> 
                          Oct 30, 2025
                        </div>

                        <div className="flex items-center gap-1">
                            <Image
                            src="/images/blog/clock-icon.svg"
                            alt="clock icon"
                            width={16}
                            height={16}
                          /> 
                          4 Min Read
                        </div>
                      </div>

                      <p className="mt-3 text-18 font-bold leading-tight text-gray-900">
                        Design Tips: Using Glass Windows to Create a Spacious Look
                      </p>
                    </div>
                  </div>


                  {/* ------- CARD 5 ------- */}
                  <div className="reveal-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md ">
                    {/* Image */}
                    <div className="reveal-img-wrapper relative h-56 w-full overflow-hidden">                    
                      <Image
                        src="/images/blog/windowDoorImg1.webp"
                        alt="Door Designs"
                        fill
                        className="object-cover reveal-img card-image"
                      />
                      {/* Tag */}
                     <span className="absolute top-3 right-3 bg-[#ffffffcc]  text-14 font-semibold px-3 py-1 rounded-full shadow tag-item">
                        Windows & doors
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-14 text-theme/70 justify-between">
                        <div className="flex items-center gap-2">
                        <Image
                            src="/images/blog/calender-icon.svg"
                            alt="calendar icon"
                            width={16}
                            height={16}
                          /> Nov 18, 2025
                        </div>

                        <div className="flex items-center gap-1">
                          <Image
                            src="/images/blog/clock-icon.svg"
                            alt="calendar icon"
                            width={16}
                            height={16}
                          /> 9 Min Read
                        </div>
                      </div>

                      <p className="mt-3 text-18 font-bold leading-tight text-gray-900">              
                        Trendy and Functional Door Designs for Homes in 2025
                      </p>
                    </div>
                  </div>

                  {/* ------- CARD 6 ------- */}
                  <div className="reveal-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md">
                    {/* Image */}
                    <div className="reveal-img-wrapper relative h-56 w-full overflow-hidden">
                      <Image
                        src="/images/blog/windowDoorImg2.webp"
                        alt="Glass Window Tips"
                        fill
                        className="object-cover reveal-img card-image"
                      />

                      {/* Tag */}
                      <span className="absolute top-3 right-3 bg-[#ffffffcc]  text-14 font-semibold px-3 py-1 rounded-full shadow tag-item">
                      Architecture & design
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-14 text-theme/70 justify-between">
                        <div className="flex items-center gap-1">
                          <Image
                            src="/images/blog/calender-icon.svg"
                            alt="calendar icon"
                            width={16}
                            height={16}
                          /> 
                          Oct 30, 2025
                        </div>

                        <div className="flex items-center gap-1">
                            <Image
                            src="/images/blog/clock-icon.svg"
                            alt="clock icon"
                            width={16}
                            height={16}
                          /> 
                          4 Min Read
                        </div>
                      </div>

                      <p className="mt-3 text-18 font-bold leading-tight text-gray-900">
                        Design Tips: Using Glass Windows to Create a Spacious Look
                      </p>
                    </div>
                  </div>
              </div>
          </div>
        </div>

        <div id="content-windows" className={`${active === "windows" ? "block" : "hidden"}`}>
          <Content title="Windows & Doors" text="Window & door design ideas." />
        </div>

        <div id="content-home" className={`${active === "home" ? "block" : "hidden"}`}>
          <Content title="Home Decor" text="Decor inspiration & trends." />
        </div>

        <div id="content-architecture" className={`${active === "architecture" ? "block" : "hidden"}`}>
          <Content title="Architecture & Design" text="Architecture insights." />
        </div>

        <div id="content-eco" className={`${active === "eco" ? "block" : "hidden"}`}>
          <Content title="Eco-Friendly Home" text="Sustainable home solutions." />
        </div>

        <div id="content-smart" className={`${active === "smart" ? "block" : "hidden"}`}>
          <Content title="Smart City" text="Technology for future living." />
        </div>

        <div id="content-corporate" className={`${active === "corporate" ? "block" : "hidden"}`}>
          <Content title="Corporate Newsroom" text="Latest corporate updates." />
        </div>

      </div>
    </div>
  );
}

/* CUSTOM SELECT — styled dropdown (replaces native select) */
function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Hidden native select for form/accessibility fallback */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="fy-select sr-only"
        aria-hidden
        tabIndex={-1}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`selected-value w-full px-3 py-3 bg-[#F4F5F7] border-none rounded-lg flex items-center justify-between gap-2 transition-all duration-200 text-left text-gray-700 ${
          isOpen ? "rounded-b-none" : ""
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={value === "" ? "text-[#999]" : ""}>{selectedOption.label}</span>
        <Image
          src="/images/down-arrow.svg"
          alt=""
          width={10}
          height={10}
          className={`select-arrow transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <ul
        role="listbox"
        className={`dropdown-options absolute left-0 right-0 top-full mt-0 bg-white border border-t-0 border-gray-200 rounded-b-lg shadow-lg max-h-[320px] overflow-y-auto z-9 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options.map((o) => (
          <li
            key={o.value}
            role="option"
            aria-selected={o.value === value}
            onClick={() => {
              onChange(o.value);
              setIsOpen(false);
            }}
            className={`px-3 py-2.5 cursor-pointer text-sm sm:text-base hover:bg-[#0094D9] hover:text-white transition-colors ${
              o.value === value ? "bg-[#0094D9]/10 text-[#0094D9] font-medium" : ""
            }`}
          >
            {o.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* CONTENT COMPONENT */
function Content({ title, text }: { title: string; text: string }) {
  return (
    <div className="content-box">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-theme/70">{text}</p>
    </div>
  );
}
