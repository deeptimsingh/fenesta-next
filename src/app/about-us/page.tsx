"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";

import BannerMain from "@/components/templates/aboutPage/bannerMain";
import JourneyTimeline from "@/components/templates/aboutPage/ourJourney";
import OurValues from "@/components/templates/aboutPage/ourValues";

import "@/components/templates/aboutPage/aboutus.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function About() {
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const missionRef = useRef<HTMLDivElement | null>(null);
  const visionRef = useRef<HTMLDivElement | null>(null);

  const missionLineRef = useRef<SVGSVGElement | null>(null);
  const visionLineRef = useRef<SVGSVGElement | null>(null);

  const missionDotRef = useRef<HTMLDivElement | null>(null);
  const visionDotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /** ==========================================
     * PARALLAX IMAGE ANIMATION
     ========================================== */
    imageRefs.current.forEach((el) => {
      if (!el) return;
      const img = el.querySelector("img");
      if (!img) return;

      gsap.set(img, { scale: 1.125 });

      gsap.fromTo(
        img,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    });

   /** ==========================================
 * MISSION — draw immediately when entering viewport (dot stationary)
 ========================================== */
if (missionLineRef.current && missionRef.current) {
  const path = missionLineRef.current.querySelector("path");

  if (path) {
    const len = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: len,
      strokeDashoffset: len,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "power1.out",
      duration: 0.6,
      scrollTrigger: {
        trigger: missionRef.current,   // ✅ FIXED — section scrolls into view
        start: "top bottom",           // animation starts as soon as visible
        toggleActions: "play none none reverse",
      },
    });
  }
}


/** ==========================================
 * VISION — draw immediately when entering viewport (dot stationary)
 ========================================== */
if (visionLineRef.current && visionRef.current) {
  const paths = Array.from(visionLineRef.current.querySelectorAll("path"));

  paths.forEach((p) => {
    const len = p.getTotalLength();
    gsap.set(p, {
      strokeDasharray: len,
      strokeDashoffset: len,
    });
  });

  gsap.to(paths, {
    strokeDashoffset: 0,
    ease: "power1.out",
    duration: 0.9,
    scrollTrigger: {
      trigger: visionRef.current,   // ✅ FIXED — section enters viewport
      start: "top bottom",
      toggleActions: "play none none reverse",
    },
  });
}


    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="about-page w-full">
      {/*Banner Main*/}
      <BannerMain />

      {/* INTRO SECTION */}
      <section className="intro-section relative ">
        <div className="container">
          <div className="intro-heightlight mx-auto grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-10 items-start -mt-[60px] rounded-sm bg-white p-6 relative z-20">   
            <div className="flex flex-col justify-center">
              <p className="first-intro-line font-normal leading-6 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
              </p>            
            </div>        
            <div className="flex gap-8 md:justify-center">
              <div ref={addToRefs} className="overflow-hidden w-56 h-72 rounded-xl shadow-lg bg-gray-100">
                <Image src="/images/about/about-img1.webp" alt=""  width={220}  height={300}  className="w-full h-full object-cover"/>
              </div>

              <div ref={addToRefs} className="overflow-hidden w-56 h-72 rounded-xl shadow-lg bg-gray-100 mt-10">
                <Image src="/images/about/about-img2.webp" alt=""  width={220}  height={300}  className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="w-full bg-white mission-vision relative -mt-5 common-padding overflow-hidden">
        <div className="container-fluid px-4 md:px-0!">
          <div className="max-w-3xl mx-auto">
            {/* LEFT - MISSION */}
            <div ref={missionRef} className="flex flex-col items-start text-center md:text-left relative">
              <div className="missionBox md:absolute md:-left-[30vw] md:-top-[3.5vw]  max-w-none z-20 mx-auto md:mx-0">
                <svg ref={missionLineRef}
                  className="w-full md:w-[28vw] h-auto"
                  viewBox="0 0 420 257"
                  preserveAspectRatio="xMinYMid slice"
                  fill="none"
                  stroke="#009FE3"
                  strokeWidth="1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* mission long path */}
                  <path d="M0 252.869C0 252.869 99.9809 260.388 94.4772 253.786C88.9736 247.184 15.2264 229.577 39.8091 228.66C64.3917 227.743 172.26 249.751 185.377 249.385C198.493 249.018 173.177 249.11 149.42 235.996C125.663 222.883 84.0206 174.556 86.4971 101.929C88.9728 29.3018 138.688 -0.0420755 178.863 0.507569C219.039 1.05803 249.4 47.458 259.169 67.5413C268.937 87.6238 270.039 100.401 268.876 98.3836C267.714 96.3658 251.601 51.0356 227.936 28.4773C204.272 5.91813 182.716 1.05803 157.95 10.0446C133.184 19.0311 109.611 55.9865 112.088 118.16C114.564 180.333 161.62 240.031 207.482 241.681C253.345 243.332 269.671 181.893 272.79 163.919C275.909 145.946 272.056 110.457 270.222 108.806C268.388 107.156 257.655 108.256 259.215 119.444C260.774 130.631 267.286 196.152 217.893 214.033C168.498 231.915 118.692 134.391 135.203 78.8205C151.714 23.2499 190.054 21.2321 219.957 44.1577C249.859 67.0833 255.088 98.0777 254.905 101.47C254.721 104.863 246.925 107.89 243.255 101.47C239.586 95.0514 222.708 43.424 180.148 52.4106C137.587 61.3971 143.642 158.6 184.55 185.377C225.46 212.154 246.648 165.891 247.749 149.11C248.85 132.328 247.78 118.619 246.007 117.579C244.233 116.54 234.939 116.663 234.999 122.837C235.061 129.012 238.53 168.229 204.821 171.117C171.112 174.006 159.968 100.003 175.791 84.0479C191.613 68.0918 208.812 73.3192 221.607 88.4491C234.403 103.58 229.679 111.833 219.956 109.143C210.233 106.452 207.481 91.4141 193.111 95.0203C178.741 98.6273 179.597 143.102 202.07 147.87C224.543 152.639 225.779 120.145 221.254 119.473C216.729 118.801 207.329 124.64 203.691 123.783C200.053 122.927 202.957 119.183 202.239 119.168C201.52 119.152 197.301 122.988 197.407 123.738C197.514 124.487 205.235 123.294 205.28 122.301C205.326 121.308 203.355 119.398 204.057 118.878C204.761 118.358 333.696 83.3583 335.209 82.7171C336.723 82.075 339.658 76.7413 338.466 76.7413C337.273 76.7413 317.338 82.1822 317.124 81.846C316.91 81.5098 318.653 77.7498 319.234 77.4448C319.815 77.1389 347.302 69.1306 346.415 70.6282C345.529 72.1258 338.328 82.3965 338.925 81.4796C339.521 80.5627 341.447 75.0834 340.667 74.9231C339.887 74.7628 312.599 82.3965 311.177 83.589C309.755 84.7807 308.517 92.9428 308.058 93.4008C307.6 93.8589 224.038 118.023 222.433 117.931C220.828 117.84 220.598 115.96 221.516 115.639C222.433 115.318 334.49 85.3623 336.264 85.6673C338.038 85.9733 344.107 91.0166 343.739 91.9793C343.373 92.942 320.579 99.6825 318.79 99.8199C317.002 99.9573 310.443 94.4093 311.177 93.9971C311.911 93.584 349.335 83.9554 349.977 82.9011C350.619 81.8468 349.167 79.1567 347.944 79.0953C346.721 79.034 341.615 79.9206 341.553 80.8375C341.492 81.7544 352.682 84.3529 352.376 85.6363C352.07 86.9196 342.134 90.435 344.641 88.6928C347.148 86.9507 362.68 82.8545 368.734 106.88C374.788 130.906 393.317 100.461 419 105.413" stroke="#0094D9" strokeMiterlimit="10"/>
                </svg>
                {/* DOT stays fixed */}
                <div ref={missionDotRef} className="w-4 h-4 rounded-full bg-[#009FE3] hidden md:flex md:absolute md:top-[6.5vw] md:right-0"></div>                
              </div>

              <div className="max-w-sm relative">                
                <h2 className="text-h2 leading-normal">Mission</h2>
                <p className="text-p leading-normal mb-0">
                  To establish a service organisation that passionately provides Customised Building Solutions and delivers Exceptional Customer Experience.
                </p>
              </div>
            </div>

            {/* RIGHT - VISION */}
            <div ref={visionRef} className="flex flex-col items-end text-center md:text-right mt-10 md:mt-0 relative">
              <div className="visionBox md:absolute md:right-[-30vw] md:-top-[5.5vw] max-w-none z-20 mx-auto md:mx-0">                
                       
                <svg ref={visionLineRef}  className="w-full md:w-[28vw] h-auto" viewBox="0 0 499 145"  preserveAspectRatio="xMinYMid slice" fill="none"  stroke="#009FE3" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M138.674 134.757C212.079 137.982 260.97 67.4757 260.715 67.4757C160.628 -53.8233 60.1686 16.9345 22.4495 67.4757C64.8584 115.705 104.433 133.252 138.674 134.757ZM138.674 134.757C137.154 141.21 119.697 147.919 62.0356 123.121C53.443 119.426 24.6898 102.207 0.415039 138.433M138.674 134.757C148.228 142.557 190.667 152.502 260.715 127.059C260.715 126.748 360.748 80.5199 511.361 134.757" stroke="#0094DA"/>
                  <path d="M141.441 36.2393C158.918 36.2393 173.086 50.4065 173.086 67.8828C173.086 85.3592 158.918 99.5264 141.441 99.5264C123.965 99.5262 109.798 85.3591 109.798 67.8828C109.798 50.4065 123.965 36.2394 141.441 36.2393Z" stroke="#0094DA"/>
                  <circle cx="141.442" cy="67.7349" r="62.0338" stroke="#0094DA"/>
                  <path d="M150.215 37.4548C161.754 39.1817 187.516 52.7144 198.254 93.0295M169.371 82.7533C163.641 97.9814 137.718 118.058 80.0713 76.8013" stroke="#0094DA"/>
                </svg>

                            
                {/* DOT stays fixed */}
                <div ref={visionDotRef} className="w-4 h-4 rounded-full bg-[#009FE3] hidden md:flex md:absolute md:top-[7.5vw] md:-left-[10px]"></div>
              </div>

              <div className="max-w-sm">
                <h2 className="text-h2 leading-normal">Vision</h2>
                <p className="text-p leading-normal mb-0">
                  To Improve the Lives and Homes of customers through Innovation and Excellence and be the brand leader in Customised Building Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Our Journey*/}      
      <JourneyTimeline />
 

      {/*Our Value*/}
      <OurValues />
    </section>
  );
}
