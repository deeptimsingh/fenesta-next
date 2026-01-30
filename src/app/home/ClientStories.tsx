// components/home/ClientStories.tsx
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

import { useMediaQuery } from "react-responsive";
import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";

import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

interface Client {
  id: number;
  img: string;
  name: string;
  video: string;
  size: number;
  offsetX: string;
  offsetY: string;
}

export default function ClientStories() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
      size: 135,
      offsetX: "-220%",
      offsetY: "-145%",
    },
    {
      id: 2,
      img: "/images/clients/client-2.webp",
      name: "Client 2",
      video: "/videos/client-2.mp4",
      size: 160,
      offsetX: "160%",
      offsetY: "-150%",
    },
    {
      id: 3,
      img: "/images/clients/client-3.webp",
      name: "Client 3",
      video: "/videos/client-1.mp4",
      size: 195,
      offsetX: "-240%",
      offsetY: "80%",
    },
    {
      id: 4,
      img: "/images/clients/client-4.webp",
      name: "Client 4",
      video: "/videos/client-2.mp4",
      size: 160,
      offsetX: "0%",
      offsetY: "140%",
    },
    {
      id: 5,
      img: "/images/clients/client-5.webp",
      name: "Client 5",
      video: "/videos/client-1.mp4",
      size: 210,
      offsetX: "220%",
      offsetY: "50%",
    },
  ];

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
     CINEMATIC OPEN
  =============================== */
  useLayoutEffect(() => {
    if (!activeClient) return;
    if (!modalRef.current || !overlayRef.current || !videoContainerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { opacity: 0, pointerEvents: "none" });
      gsap.set(videoContainerRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(contentRef.current, { opacity: 0, y: 40 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(overlayRef.current, { opacity: 1, duration: 0.4 })
        .to(modalRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.01 })
        .to(videoContainerRef.current, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.1")
        .to(contentRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .call(() => safePlayVideo());
    }, modalRef);

    return () => ctx.revert();
  }, [activeClient]);

  /* ===============================
     CLOSE MODAL
  =============================== */
  const closeModal = () => {
    if (!modalRef.current || !overlayRef.current || !videoContainerRef.current || !contentRef.current) {
      setActiveClient(null);
      unlockScroll();
      return;
    }

    videoRef.current?.pause();

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setActiveClient(null);
        unlockScroll(); // 🔓 RESTORE SCROLL

        const lenis = getLenis();
        if (lenis?.start) {
          try {
            lenis.start();
          } catch {}
        }
      },
    });

    tl.to(contentRef.current, { opacity: 0, y: 40, duration: 0.3 })
      .to(videoContainerRef.current, { opacity: 0, scale: 0.9, duration: 0.4 }, "-=0.1")
      .to(overlayRef.current, { opacity: 0, duration: 0.4 }, "-=0.2");
  };

  return (
    <>
      <section className="relative bg-[#E3E4E6] text-center overflow-hidden w-full py-16 md:h-[768px] md:max-h-[768px]">
        <div className="absolute inset-0 bg-[url('/images/home/designstories-bg.webp')] bg-center bg-cover z-19" />

        <div ref={sectionRef} className="w-full">
          <div ref={headingRef}  className="relative md:absolute left-1/2 -translate-x-1/2 max-w-full md:max-w-3xl inset-0 flex flex-col justify-center items-center z-40 px-6 md:px-0 title-section">
            <h2 className="font-mainFont text-pageh2 leading-none text-white">
              Explore Our <span className="font-subFont text-corinthiaHeading text-white">Design stories</span>
            </h2>
            
            <div className="headingSubTitle flex flex-col justify-center w-full my-4  sm:max-w-lg">              
              <p className="  max-w-full mx-auto  text-white">
                Discover how Fenesta brings peace, privacy and comfort into every space
              </p>
            </div>
            <FenestaButton>Hear from our customers</FenestaButton>
          </div>
        </div>

       

        {!isMobile && (
          <div className="relative w-full h-full flex items-center justify-center">
            {clients.map((client, i) => (
              <div
                key={client.id}
                ref={(el) => {imageRefs.current[i] = el}}
                className="absolute cursor-pointer z-50"
                style={{ transform: `translate(${client.offsetX}, ${client.offsetY})` }}
                onClick={() => openModal(client)}
              >
                {/* ✅ PLAY ICON RESTORED */}
                <div className="relative">
                  <Image src={client.img} alt={client.name} width={client.size} height={client.size} className="rounded-full" />
                  <div className="absolute left-[65%] top-[75%] w-14 h-14 bg-[#00000073] rounded-full flex items-center justify-center pointer-events-none">
                    <Image src="/images/clients/play-icon.webp" alt="Play" width={20} height={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isMobile && (
          <Swiper centeredSlides slidesPerView="auto" spaceBetween={20} pagination={{ clickable: true }} modules={[Pagination]} className="w-full !pb-10 mt-6">
            {clients.map((client, i) => (
              <SwiperSlide key={client.id} style={{ width: "300px" }}>
                <div ref={(el) => {imageRefs.current[i] = el}} onClick={() => openModal(client)} className="relative w-[260px] h-[260px] mx-auto cursor-pointer">
                  <Image src={client.img} alt={client.name} width={260} height={260} className="rounded-full border-4 border-white" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {activeClient && (
        <>
        <div ref={overlayRef} className="custommodal fixed inset-0 bg-white/80 backdrop-blur-md z-[9998]" onClick={closeModal}/>
          <div ref={modalRef} className="custommodal-in fixed inset-0 z-[9999] text-gray h-screen"  style={{ overflowY: "auto" }}>           
            <div className="container-fluid min-h-screen">
              <div className="flex items-start  justify-center min-h-screen max-w-4xl mx-auto flex-wrap">
                <div ref={videoContainerRef} className="w-full max-w-3xl p-6 sm:p-8">
                  <video
                    ref={videoRef}
                    src={activeClient.video}
                    controls
                    muted
                    playsInline
                    className="w-full h-[360px] sm:h-[400px] rounded-2xl object-cover"
                  />
                </div>

                <div ref={contentRef} className="text-center px-6 pb-12 max-w-2xl mx-auto">
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

              <button onClick={closeModal} className="fixed top-6 right-6 z-[10000]  pointer-events-auto flex items-center text-white  h-10 px-3 bg-blue-500 hover:bg-blue-600
                rounded-full  overflow-hidden transition-all duration-300 ease-out  group  ">
                {/* X ICON */}
                <span className="text-lg leading-none">✕</span>

                {/* CLOSE TEXT */}
                <span
                  className="
                    max-w-0  max-h-0 
                    group-hover:max-w-[60px] group-hover:max-h-[60px] group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 ease-out
                    whitespace-nowrap
                    text-sm ms-2">   Close
                </span>
              </button>

              </div>
            </div>
          </div>
        
        </>
      )}
    </>
  );
}
