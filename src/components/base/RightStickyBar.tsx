"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function RightStickyBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const onScroll = () => {
      // Don't update when a modal has locked scroll (body position: fixed) – prevents sidebar jump
      if (typeof document !== "undefined" && document.body.style.position === "fixed") return;
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    // Check initial scroll position
    onScroll();
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Prevent hydration mismatch - render consistent structure until mounted
  if (!mounted) {
    return (
      <div 
        className="fixed right-0 z-50  rightsidebar top-0 bottom-0 h-screen opacity-0 pointer-events-none"
        suppressHydrationWarning
      >
        <div className="relative flex flex-col overflow-hidden backdrop-blur-md text-white rounded-l-xl w-[90px] h-full" />
      </div>
    );
  }

  return (
    <>
        {/* ================================ Chatbot ================================= */}   
        {/* Mobile Chatbot */}
        {isMobile  && (
            <div className="fixed bottom-5 right-2 z-50">
                <Image src="/images/sidebar/chatboot.svg" alt="chatboot" width={75} height={82} className="shrink-0" />
            </div>
        )}   

        {/* Desktop Chatbot */}
         {!isMobile && (
            <div className="fixed bottom-5 right-2 z-60">
                <Image src="/images/sidebar/chatboot.svg" alt="chatboot" width={75} height={82} className="shrink-0" />
            </div>
        )}

      {/* Right arrow - 40×40px, opens second screen on click (mobile) or hover (desktop) */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-1/2 -translate-y-1/2 right-0 z-50 h-14 w-14 md:hidden bg-[#1212127D] hover:bg-[#121212] backdrop-blur-md rounded-[10px_0px_0px_10px] shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Open menu"
          suppressHydrationWarning
        >
          <Image
            src="/images/slider-arrow-next-white.svg"
            alt="Open"
            width={20}
            height={20}
            
          />
        </button>
      )}
      
      {isMobile && isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed top-1/2 -translate-y-1/2 right-[80px] z-50  rounded-[10px_0px_0px_10px] h-14 w-14 bg-[#1212127D] hover:bg-theme transition-colors flex items-center justify-center backdrop-blur-lg"  aria-label="Close menu" >
          <svg width="30" height="24" viewBox="0 0 30 24" fill="none" className="text-white">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <div 
        className={`group fixed right-0 z-100 rightsidebar transition-all duration-500 ease-in-out top-1/2 -translate-y-1/2 
          ${isMobile ? " top-1/2 -translate-y-1/2 h-auto w-full max-w-[90px]" : ""}
          ${!isMobile && scrolled ? "h-auto top-1/2 -translate-y-1/2 group-hover:h-auto group-hover:top-1/2 group-hover:-translate-y-1/2" : ""}
          ${!isMobile && !scrolled ? "top-1/2 -translate-y-1/2 h-auto" : ""}
          ${isMobile && isOpen ? "translate-x-0" : isMobile ? "translate-x-full" : ""}
        `}
        suppressHydrationWarning
      >     
      
      <div className={`relative flex flex-col overflow-hidden  text-white transition-all duration-500 ease-in-out rounded-l-xl 
        ${isMobile ? "w-full h-auto rounded-t-xl" : ""}
        ${!isMobile && scrolled ? "w-14 h-auto group-hover:w-[90px] group-hover:h-auto group-hover:items-center group-hover:justify-center" : ""}
        ${!isMobile && !scrolled ? "w-[90px] h-auto" : ""}
      `}>
        {/* ARROW - Hide on hover when scrolled (desktop only), show when not hovered - Vertically centered with auto height */}
        {!isMobile && (
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 flex w-14 h-14 0 bg-[#1212127D]  items-center justify-center transition-all duration-300 z-10 ${scrolled ? "opacity-100 group-hover:opacity-0 group-hover:pointer-events-none" : "opacity-0 pointer-events-none"}`}>
            <Image
              src="/images/slider-arrow-next-white.svg"
              alt="Open"
              width={18}
              height={18}
              className="pointer-events-none"
            />
          </div>
        )}

        {/* LINKS - Hide when scrolled, show on hover (desktop) or always visible (mobile) */}
        <div className={`rightsidebar-links bg-[#1212127D] backdrop-blur-md flex flex-col divide-y divide-white/20 transition-all duration-500 ease-in-out w-full 
          ${isMobile ? "opacity-100 pointer-events-auto" : ""}
          ${!isMobile && scrolled ? "-left-14  opacity-0 pointer-events-none group-hover:left-0 group-hover:opacity-100 group-hover:pointer-events-auto h-auto items-center justify-center" : ""}
          ${!isMobile && !scrolled ? "opacity-100 h-full justify-center" : ""}
        `}>
          <StickyItem
             icon="/images/sidebar/downloadBrochure.svg"
            label="Download brochure"
          />
          <StickyItem
             icon="/images/sidebar/location.svg"
            label="Locate Us"
          />
          <StickyItem
            icon="/images/sidebar/bookaConsult.svg"
            label="Book A Consult"
          />
        </div>

       
      </div>
      </div>

   
    </>
  );
}

function StickyItem({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <a
      href="#"
      className="flex flex-col items-center justify-center text-center gap-2 px-4 py-6 hover:bg-white/10 active:bg-white/20 transition-colors touch-manipulation min-h-[60px] md:min-h-0"
    >
      <Image src={icon} alt={label} width={24} height={24} className="shrink-0" />
      <span className="text-sm whitespace-normal leading-tight">{label}</span>
    </a>
  );
}
