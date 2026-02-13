// components/home/ClientStories.tsx
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

import { useMediaQuery } from "react-responsive";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";

import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

interface ClientBreakpoint {
  size: number;
  offsetX: string;
  offsetY: string;
}

interface Client {
  id: number;
  img: string;
  name: string;
  video: string;
  desktop: ClientBreakpoint;
  tablet?: ClientBreakpoint;  // md: 768–1023px
  mobile?: ClientBreakpoint;  // sm: <768px (used if desktop ever shown at small)
}

export default function ClientStories() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalPanelRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const revealCircleRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const BASE_SIZE = 50;
  const scaledValue = () => {
    let w = typeof window !== "undefined" ? window.innerWidth : 1920;
    const h = typeof window !== "undefined" ? window.innerHeight : 1080;
    if (h > w) w = h;
    return Math.ceil(w / BASE_SIZE + 10);
  };

  const scrollYRef = useRef(0);

  const [activeClient, setActiveClient] = useState<Client | null>(null);

  // 🔥 Heading animation with GSAP (using common defaults)
  const { headingRef, sectionRef } = useHeadingAnimation();

  /* ===============================
     LENIS SAFE
  =============================== */
  const getLenis = () => {
    // @ts-ignore
    return window?.lenis || null;
  };

  /* ===============================
     SCROLL LOCK (BULLETPROOF)
  =============================== */
  const lockScroll = () => {
    scrollYRef.current = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  };

  const unlockScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollYRef.current);
  };

  const clients: Client[] = [
    {
      id: 1,
      img: "/images/clients/client-1.webp",
      name: "Client 1",
      video: "/videos/client-1.mp4",
      desktop: { size: 135, offsetX: "-220%", offsetY: "-145%" },
      tablet: { size: 95, offsetX: "-180%", offsetY: "-120%" },
    },
    {
      id: 2,
      img: "/images/clients/client-2.webp",
      name: "Client 2",
      video: "/videos/client-2.mp4",
      desktop: { size: 160, offsetX: "160%", offsetY: "-150%" },
      tablet: { size: 115, offsetX: "130%", offsetY: "-125%" },
    },
    {
      id: 3,
      img: "/images/clients/client-3.webp",
      name: "Client 3",
      video: "/videos/client-1.mp4",
      desktop: { size: 195, offsetX: "-240%", offsetY: "80%" },
      tablet: { size: 140, offsetX: "-200%", offsetY: "65%" },
    },
    {
      id: 4,
      img: "/images/clients/client-4.webp",
      name: "Client 4",
      video: "/videos/client-2.mp4",
      desktop: { size: 160, offsetX: "0%", offsetY: "140%" },
      tablet: { size: 115, offsetX: "0%", offsetY: "115%" },
    },
    {
      id: 5,
      img: "/images/clients/client-5.webp",
      name: "Client 5",
      video: "/videos/client-1.mp4",
      desktop: { size: 210, offsetX: "220%", offsetY: "50%" },
      tablet: { size: 150, offsetX: "180%", offsetY: "45%" },
    },
  ];

  const getClientStyle = (client: Client) => {
    const bp = isTablet ? client.tablet : client.desktop;
    return bp || client.desktop;
  };

  /* ===============================
     FLOATING AVATARS
  =============================== */
  useLayoutEffect(() => {
    imageRefs.current.forEach((el) => {
      if (!el) return;

      gsap.to(el, {
        y: "+=10",
        duration: 1 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 4,
      });
    });
  }, []);

  /* ===============================
     SAFE VIDEO PLAY
  =============================== */
  const safePlayVideo = () => {
    const video = videoRef.current;
    if (!video || !video.src) return;

    if (video.readyState < 2) {
      video.addEventListener(
        "loadeddata",
        () => {
          video.play().catch(() => {});
        },
        { once: true }
      );
    } else {
      video.play().catch(() => {});
    }
  };

  /* ===============================
     OPEN MODAL
  =============================== */
  const openModal = (client: Client) => {
    setActiveClient(client);

    lockScroll(); // 🔒 HARD LOCK

    const lenis = getLenis();
    if (lenis?.stop) {
      try {
        lenis.stop();
      } catch {}
    }
  };

  /* ===============================
     OPEN MODAL ANIMATION (CodePen: circle scales from center, then modal)
  =============================== */
  useLayoutEffect(() => {
    if (!activeClient) return;
    if (!modalRef.current || !overlayRef.current || !revealCircleRef.current) return;

    const closeBtn = closeBtnRef.current;
    const circle = revealCircleRef.current;
    const modal = modalRef.current;
    const scaleTo = scaledValue();

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(circle, { scale: 1 });
      gsap.set(modal, { autoAlpha: 0 });
      if (closeBtn) gsap.set(closeBtn, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

      tl.to(overlayRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" }, 0)
        .to(circle, {
          scale: scaleTo,
          duration: 0.6,
          ease: "power2.inOut",
        }, 0.1)
        .to(modal, { autoAlpha: 1, duration: 0.25, ease: "power2.out" }, 0.5);
      if (closeBtn) tl.to(closeBtn, { opacity: 1, duration: 0.2 }, 0.55);
      tl.call(() => safePlayVideo(), undefined, 0.6);
    }, modalRef);

    return () => ctx.revert();
  }, [activeClient]);

  /* ===============================
     CLOSE MODAL ANIMATION (reverse: modal out, circle scales down)
  =============================== */
  const closeModal = () => {
    if (!modalRef.current || !overlayRef.current || !revealCircleRef.current) {
      setActiveClient(null);
      unlockScroll();
      return;
    }

    videoRef.current?.pause();

    const closeBtn = closeBtnRef.current;
    const circle = revealCircleRef.current;
    const modal = modalRef.current;
    const overlay = overlayRef.current;

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        // Defer unmount so GSAP can finish cleanup and avoid reading _gsap on null
        requestAnimationFrame(() => {
          setActiveClient(null);
          unlockScroll();
          const lenis = getLenis();
          if (lenis?.start) {
            try {
              lenis.start();
            } catch {}
          }
        });
      },
    });

    if (closeBtn) tl.to(closeBtn, { opacity: 0, duration: 0.15 }, 0);
    tl.to(modal, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0)
      .to(circle, { scale: 1, duration: 0.5, ease: "power2.inOut" }, 0.15)
      .to(overlay, { opacity: 0, duration: 0.3, ease: "power2.out" }, 0.4);
  };

  return (
    <>
      <section className="clientstories-section relative bg-[#E3E4E6] text-center overflow-hidden w-full common-padding h-auto min-h-[600px] md:min-h-[640px] lg:min-h-[768px] md:h-[640px] lg:h-[768px] md:max-h-[768px]">
        <div className="absolute inset-0 bg-[url('/images/home/designstories-bg.webp')] bg-center bg-cover z-2" />

        <div ref={sectionRef} className="w-full">
          <div ref={headingRef}  className="relative md:absolute left-1/2 -translate-x-1/2 max-w-full md:max-w-3xl inset-0 flex flex-col justify-center items-center z-40 px-6 md:px-0 title-section">
            <h2 className="font-mainFont text-h2 leading-none text-white">
              Explore Our <span className="font-subFont text-corinthiaHeading text-white">Design stories</span>
            </h2>
            
            <div className="headingSubTitle flex flex-col justify-center w-full my-4  sm:max-w-lg">              
              <p className="  max-w-full mx-auto  text-white">
                Discover how Fenesta brings peace, privacy and comfort into every space
              </p>
            </div>
            <div className="hidden md:flex"><FenestaButton >Hear from our customers</FenestaButton></div>            
          </div>
        </div>

       

        {/* Desktop/Tablet View - Hidden on mobile */}
        <div className="hidden md:flex relative w-full h-full items-center justify-center" suppressHydrationWarning>
          {clients.map((client, i) => {
            const style = getClientStyle(client);
            return (
            <div
              key={client.id}
              ref={(el) => {imageRefs.current[i] = el}}
              className="absolute cursor-pointer z-50"
              style={{ transform: `translate(${style.offsetX}, ${style.offsetY})` }}
              onClick={() => openModal(client)}
            >
              {/* ✅ PLAY ICON RESTORED */}
              <div className="relative">
                <Image src={client.img} alt={client.name} width={style.size} height={style.size} className="rounded-full object-cover" />
                <div className={`absolute left-[65%] top-[75%] bg-[#00000073] rounded-full flex items-center justify-center pointer-events-none ${style.size < 120 ? "w-10 h-10" : style.size < 160 ? "w-12 h-12" : "w-14 h-14"}`}>
                  <Image src="/images/clients/play-icon.webp" alt="Play" width={style.size < 120 ? 14 : style.size < 160 ? 16 : 20} height={style.size < 120 ? 14 : style.size < 160 ? 16 : 20} />
                </div>
              </div>
            </div>
          );
          })}
        </div>

        {/* Mobile Swiper - Visible on mobile */}
        <div className="flex md:hidden relative w-full mt-8 z-10" suppressHydrationWarning>
          <Swiper 
            centeredSlides 
            slidesPerView="auto" 
            spaceBetween={20} 
            pagination={{ clickable: true }} 
            modules={[Pagination]} 
            className="w-full pb-10"
          >
            {clients.map((client, i) => (
              <SwiperSlide key={client.id} style={{ width: "300px" }}>
                <div ref={(el) => {imageRefs.current[i] = el}} onClick={() => openModal(client)} className="relative w-[260px] h-[260px] mx-auto cursor-pointer">
                  {/* ✅ PLAY ICON RESTORED */}
                  <div className="relative">
                    <Image src={client.img} alt={client.name} width={260} height={260} className="rounded-full border-4 border-white" />
                    <div className="absolute left-[65%] top-[75%] w-14 h-14 bg-[#00000073] rounded-full flex items-center justify-center pointer-events-none">
                      <Image src="/images/clients/play-icon.webp" alt="Play" width={20} height={20} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>          
        </div>

        {/* Mobile CTA - keep above background layer */}
        <div className="relative z-10 mt-6 flex justify-center md:hidden">       

          <div ref={sectionRef} className="w-full">
          <div ref={headingRef}  className="relative md:absolute left-1/2 -translate-x-1/2 max-w-full md:max-w-3xl inset-0 flex flex-col justify-center items-center z-40 px-6 md:px-0 title-section">           
             <FenestaButton>Hear from our customers</FenestaButton>      
          </div>
        </div>
        </div>
      </section>

      {activeClient && (
        <>
        <div ref={overlayRef} className="custommodal fixed inset-0 bg-[00000073] backdrop-blur-md z-[9998]" onClick={closeModal} aria-hidden />
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9998]" aria-hidden>
          <div
            ref={revealCircleRef}
            className="w-[50px] h-[50px] rounded-full bg-black/70  backdrop-blur-lg"
            style={{ transformOrigin: "center center" }}
          />
        </div>
          <div
            ref={modalRef}
            className="custommodal-in fixed inset-0 z-[9999] text-gray h-screen overflow-y-auto overscroll-contain scroll-smooth"
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="container-fluid min-h-screen">
              <div ref={modalPanelRef} className="flex items-start justify-center min-h-screen max-w-5xl mx-auto flex-wrap">
                <div ref={videoContainerRef} className="w-full p-6 sm:p-8">
                  <video
                    ref={videoRef}
                    src={activeClient.video}
                    controls
                    muted
                    playsInline
                    className="w-full h-[360px] sm:h-[400px] rounded-2xl object-cover"
                  />
                </div>

                <div ref={contentRef} className="text-center px-6 pb-12  mx-auto">
                  <h3 >{activeClient.name}</h3>
                  <p >When you land on a sample web page or open an email template and see content beginning with "lorem ipsum," the page creator placed that apparent gibberish there on purpose.</p>
                  <p >Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval.</p>
                  <p >Fun Lorem Ipsum text may appear in any size and font to simulate everything you create for your campaigns.</p>
                   <p >When you land on a sample web page or open an email template and see content beginning with "lorem ipsum," the page creator placed that apparent gibberish there on purpose.</p>
                  <p>Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval.</p>
                  <p>Fun Lorem Ipsum text may appear in any size and font to simulate everything you create for your campaigns.</p>

                  <h3>What is lorem ipsum, and when did publishers begin using it?</h3>
                  <p>The standard lorem ipsum passage has been a printer's friend for centuries. Like stock photos today, it served as a placeholder for actual content. The original text comes from Cicero's philosophical work "De Finibus Bonorum et Malorum," written in 45 BC.</p>

                  <p>The use of the lorem ipsum passage dates back to the 1500s. When printing presses required painstaking hand-setting of type, workers needed something to show clients how their pages would look. To save time, they turned to Cicero's words, creating sample books filled with preset paragraphs.</p>

                  <p>However, it wasn't until the 1960s that the passage became common when Letraset revolutionized the advertising industry with its transfer sheets. These innovative sheets allowed designers to apply pre-printed lorem ipsum text in various fonts and formats directly onto their mockups and prototypes.</p>
                </div>

              <button ref={closeBtnRef} onClick={closeModal} className="fixed top-6 right-6 z-[10000] pointer-events-auto flex items-center text-white h-10 px-3 bg-blue   hover:bg-blueLight  rounded-full overflow-hidden transition-all duration-300 ease-out group">
                {/* X ICON */}
                <span className="text-lg leading-none">✕</span>
                
              </button>

              </div>
            </div>
          </div>
        
        </>
      )}
    </>
  );
}
