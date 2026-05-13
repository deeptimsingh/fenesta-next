"use client";
import Image from "next/image";
import Link from "next/link";

import {useEffect, useState, useRef } from "react";

import "@/components/templates/common.css";
import "@/components/templates/blogPage/Insidepage/blogsInside.css";

import ClientStories from "@/app/home/ClientStories";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useInsidePageBannerAnimation, getInsidePageBannerInitialStyles } from "@/hooks/useInsidePageBannerAnimation";
const initial = getInsidePageBannerInitialStyles();

type BannerMainProps = {
  animationReady?: boolean;
  title?: string;
  accentWordIndex?: number;
};


export default function BannerMain({
  animationReady = true,
  title = "Top Window & Door Design Trends for Modern Homes in 2026",
  accentWordIndex,
}: BannerMainProps) {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const words = title.trim().split(/\s+/).filter(Boolean);
  const effectiveAccentIndex =
    typeof accentWordIndex === "number"
      ? Math.min(Math.max(accentWordIndex, 0), Math.max(words.length - 1, 0))
      : Math.max(words.length - 1, 0);

  useInsidePageBannerAnimation(bgRef, titleRef, {
    startWhenReady: animationReady,
  });

 /**==============================
  Accordion 
  ==============================**/
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (year: string) => {
    setOpen(open === year ? null : year);
  };

   /**==============================
  Sticky Right Side Calculating Height 
  ==============================**/
    useEffect(() => {
    const updateOffset = () => {
      const header = document.getElementById("site-header");
      if (!header) return;

      const headerHeight = header.offsetHeight + 20; // extra spacing
      document.documentElement.style.setProperty(
        "--header-offset",
        `${headerHeight}px`
      );
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  /**IMAGES BOX ANIMATION**/
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!imagesRef.current) return;
    const images = imagesRef.current.querySelectorAll(".images-box > div");

    images.forEach((img) => {
      gsap.fromTo(
        img,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            end: "bottom 10%",
            toggleActions: "play none none reset", // 👈 key
          },
        }
      );
    });
  }, []);

  return (
    <>  
    <section  className="inside-page w-full mt-16">
      {/* Breadcrumb Section */}
      <section className="common-padding-md">
         <div className="container mx-auto">         
          <div ref={titleRef} className="relative  inset-0   z-10  max-w-6xl" style={initial.captionStyle}>
            {/* Breadcrumb */}
            <div className="breadcrumbs-outer flex items-center gap-2 text-theme/75 text-sm my-5">
              <span className="hover:text-white cursor-pointer ">Home</span>
              <Image
                src="/images/down-arrow.svg"
                alt="arrow"
                width={12}
                height={12}
                className="transform -rotate-90"
              />
              <span className="hover:text-white cursor-pointer ">Blogs</span>
              <Image
                src="/images/down-arrow.svg"
                alt="arrow"
                width={12}
                height={12}
                className="transform -rotate-90"
              />
              <span className="text-theme">Top Window & Door Design Trends for Modern Homes in 2026</span>
            </div>
            
            <h1 className="text-theme text-h1 leading-none flex justify-center sm:justify-start flex-wrap gap-3 w-full text-center sm:text-left">Top Window & Door Design Trends for <span className="font-subFont text-corinthiaHeading text-brown leading-none contents ">Modern Homes in 2026</span></h1>        

          </div>  

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mt-8">        
            {/* Meta Left */}
            <div className="flex flex-wrap items-center gap-8 ">         
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-sky-500 overflow-hidden flex items-center justify-center shrink-0">
                  <Image
                    src="/images/fenesta-logo.svg"
                    alt="Fenesta"
                    className="w-7 h-7 object-contain"
                    width={28}
                    height={28}
                  />
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">
                    Author
                  </p>

                  <h6 className="text-base font-medium text-black leading-none">
                    Fenesta
                  </h6>
                </div>
              </div>

              {/* Published */}
              <div>
                <p className="text-xs text-neutral-500 mb-1">
                  Published
                </p>

                <h6 className="text-base font-medium text-black leading-none">
                  Mar 18, 2026
                </h6>
              </div>
            </div>

            {/* Read Time */}
            <div className="text-xs text-neutral-500">
              5 minutes read
            </div>
          </div>   
        </div>    
      </section>


      <section className="inside-page-banner relative h-screen max-h-120 w-full overflow-hidden flex items-center justify-start ">        
        <div className="container relative h-full">
          {/* BACKGROUND IMAGE WITH PARALLAX */}
          <div className="absolute inset-0 rounded-xl overflow-hidden mx-6">
            <picture className="absolute inset-0 block w-full h-full ">
              {/* Desktop: 768px and up */}
              <source
                media="(min-width: 768px)"
                srcSet="/images/banner/blogs-inside-page.webp"
              />
              {/* Mobile: below 768px — use blog-bg-mobile.webp when available, or same as desktop */}
              <source
                media="(max-width: 767px)"
                srcSet="/images/banner/blogs-inside-page-mobile.webp"
              />
              <Image
                src="/images/banner/blogs-inside-page.webp"
                alt="Hero Background"
                fill
                sizes="100vw"
                className="object-cover"
                fetchPriority="high"
              />
            </picture>

            {/* ✨ GRADIENT OVERLAY — YOUR CUSTOM STYLE */}
            <div
              className="banner-overlay absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,0)_36.81%,rgba(0,0,0,0.7)_70%)] sm:bg-[linear-gradient(-90deg,rgba(0,0,0,0)_36.81%,rgba(0,0,0,0.7)_70%)]"
            />
          </div>
        </div>      
      </section>

          
      <section className="content-wrapper ">
        <div className="two-col-outer mx-auto w-full   flex flex-row d:flex-col flex-wrap  items-start  ">
          <div className="container mx-auto">
            <div className="two-col flex flex-wrap gap-5 common-padding-md">
              {/* Left SIDEBAR */}
              <div className="left-side blog-left-side  flex-1 max-w-[calc(100%-315px)]  relative z-20 ">               
                <div className="blog-content bg-white bg-darkbase h-full ">
                  <p>In 2026, window and door trends are being shaped by minimalism, energy efficiency, smart technology, and a growing desire for seamless indoor-outdoor living. Homeowners now prioritise comfort, aesthetics, and sustainability, leading to several new trends in window and door designs for the home, such as larger glass-to-frame ratios, improved outdoor views, and designs that are well-suited to apartments, villas, and urban homes alike.</p>

                  <h3>What Is the Role of Natural Light in Creating Spaciousness?</h3>

                  <p>Energy-efficient windows and doors have become essential for modern homes as homeowners are looking for solutions that can help them reduce heat gain, minimise noise, and lower energy consumption throughout the year. This growing focus on performance has accelerated the use of advanced glazing options and improved thermal insulation benefits. As a result, energy efficient windows and doors are now central to creating comfortable interiors across diverse Indian climates. Materials such as aluminium and uPVC are increasingly preferred for their durability and thermal efficiency, supporting sustainable living without compromising on style.</p>

                  <p>Dimly lit spaces often feel cramped and closed off, while bright, sunlit spaces tend to have an open and airy ambiance. The more natural light you let inside a room, the less noticeable its size limitations become.</p>
                  

                  <h3 className="text-blue">Also Read: 5 Reasons to Choose Aluminium Windows for Your Home</h3>
                  <p>The benefits of glass windows in interior design are not just about aesthetics; they also have a profound impact on the overall feel and functionality of a space. By allowing natural light to flood in, creating visual connections to the outdoors, and enhancing the sense of spaciousness, glass windows can transform any room into a bright, open, and inviting environment. Whether you’re designing a cozy living room or a sleek modern kitchen, incorporating glass windows can elevate your interior design and create a more enjoyable living experience.</p>

                  

                  <div ref={imagesRef} className="images-box flex flex-wrap gap-4 my-6 ">
                    <div className="relative w-full h-[345px] flex-1 overflow-hidden rounded-2xl images-box-item">
                      <Image
                        src="/images/blog/blog-img1.webp"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="relative w-full h-[345px] flex-1 rounded-2xl overflow-hidden images-box-item">
                      <Image
                        src="/images/blog/blog-img2.webp"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>


                  <div className="blog-quote-section">  
                    <div className="blog-quote-card">    
                      <div className="blog-quote-inner">      
                        {/* Quote Icon */}
                        <div className="blog-quote-icon">
                          <svg
                            width="58"
                            height="58"
                            viewBox="0 0 58 58"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M25.5 11C14.8 16.3 9 25.2 9 37.2V47H25V31H18.2C18.9 24.5 22.8 18.9 29 15L25.5 11ZM49.5 11C38.8 16.3 33 25.2 33 37.2V47H49V31H42.2C42.9 24.5 46.8 18.9 53 15L49.5 11Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>

                        {/* Content */}
                        <div className="blog-quote-content">
                          <p className="blog-quote-text">
                            Sed sit amet arcu tincidunt, sollicitudin ligula quis,
                            dapibus ipsum. Donec quis diam mauris. In mi lectus,
                          </p>

                          <span className="blog-quote-author">
                            — By Fenesta
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3>Ready to Transform Your Space with Aluminium Glass Windows?</h3>
                  <p>Fenesta offers the best aluminium glass windows for homes, which have been designed to offer style, durability, and energy savings. Fenesta’s range of energy efficient aluminium windows has been designed with wide glass panels and sleek frames that can not only enhance the openness and spaciousness of a space but can also prevent heat transfer, ensuring comfortable indoor temperatures throughout the year.</p>

                  <p>Fenesta offers customisable fenestration solutions, allowing you to choose from various options in size, style, design, colour, and finish, so you can find the perfect aluminium windows for different rooms, based on your size and design preferences with ease.</p>

                  <p>Discover Fenesta’s range of high-quality aluminium windows with thermal break and make your space feel more spacious, brighter, and welcoming. Get in touch with our fenestration experts for a free consultation today!</p>


                  <div className="blog-comment-section">
                    <div className="blog-meta-top">
                      <div className="blog-tags">
                        <span>Tags:</span>
                        <a href="#">Architecture & design</a>
                        <a href="#">Smart city</a>
                      </div>

                      <div className="blog-share">
                        <span>Share:</span>
                        {/* <a href="#">
                          <Image src="facebook.svg" alt="facebook" />
                        </a>
                        <a href="#">
                          <Image src="linkedin.svg" alt="" />
                        </a>
                        <a href="#">
                          <Image src="twitter.svg" alt="" />
                        </a>
                        <a href="#">
                          <Image src="instagram.svg" alt="instagram" />
                        </a> */}
                      </div>
                    </div>

                    <div className="blog-author-card">
                      <div className="blog-author-img">
                        <Image
                          src="/images/blog/blog-img1.webp"
                          alt="Author"
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      </div>

                      <div className="blog-author-content">
                        <h3>Asim Rao</h3>

                        <p>
                          Cras varius feugiat placerat. Nulla pretium pretium ante quis dignissim.
                          Morbi viverra convallis fermentum
                        </p>
                      </div>

                    </div>

                    <div className="blog-comment-form-wrap max-w-4xl">
                      <h2 className="blog-comment-title">
                        Leave a <span>Comment</span>
                      </h2>

                      <form>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Name<span>*</span></label>
                            <input type="text" placeholder="Your Name" />
                          </div>

                          <div className="form-group">
                            <label>Email<span>*</span></label>
                            <input type="email" placeholder="Enter your email" />
                          </div>
                        </div>
                      
                        <div className="form-group">
                          <label>Comment</label>
                          <textarea placeholder="Comment"></textarea>
                        </div>
                        <div className="captcha-box">
                         
                        </div>

                        <button type="submit" className="submit-btn">
                          <span>→</span> SUBMIT
                        </button>
                      </form>
                    </div>
                  </div>
                </div>                   
              </div>          

              {/* RIGHT SIDEBAR */}
              <aside className="max-w-full lg:max-w-[315px] lg:block right-side  h-fit dynamic-sticky flex-1  ">
                {/* Subscribe */}
                <div className="bg-white p-4 rounded-2xl border border-theme/15  subscribe-box">
                  <h5 className="text-18 font-extrabold mb-5 text-theme">Subscribe to our blog</h5>
                  <div className="flex bg-[#E5E5E5] rounded-full overflow-hidden p-2 items-center h-12">               
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      className="flex-1 px-3 py-3 bg-transparent text-black placeholder:text-gray-500 text-base min-w-0 outline-none"
                    />
                    <button
                      type="submit"
                      className="arrow-btn h-10 w-10 shrink-0 rounded-full bg-[#0094D9] flex items-center justify-center hover:bg-[#0080c0] transition-colors"
                    >
                      <Image
                        src="/images/arrow-right.svg"
                        alt="Subscribe"
                        width={14}
                        height={14}
                      />
                    </button>                

                  </div>
                </div>

                {/* Popular blogs */}
                <div className="bg-white p-4 rounded-2xl border border-theme/15 mt-6 popularBlogs">
                  <h5 className="text-18 text-theme font-extrabold mb-3">Popular blogs</h5>

                  <Link href="#" className="flex gap-3 mb-4 popularBlogsitem">
                    <div className="relative w-[120px] min-w-[120px] h-[70px] rounded-md overflow-hidden">
                      <Image
                        src="/images/blog/corporateNewsroomImg1.webp"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>

                    <p className="text-base text-theme leading-tight line-clamp-2 flex-1 max-w-[calc(100%-120px)]  max-h-[42px]">
                      Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                      Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </Link>

                  <Link href="#" className="flex gap-3 mb-4 popularBlogsitem">
                    <div className="relative w-[120px] min-w-[120px] h-[70px] rounded-md overflow-hidden">
                      <Image
                        src="/images/blog/corporateNewsroomImg1.webp"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>

                    <p className="text-base text-theme leading-tight line-clamp-2 flex-1 max-w-[calc(100%-120px)]  max-h-[42px]">
                      Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                      Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </Link>

                  <Link href="#" className="flex gap-3 mb-4 popularBlogsitem">
                    <div className="relative w-[120px] min-w-[120px] h-[70px] rounded-md overflow-hidden">
                      <Image
                        src="/images/blog/corporateNewsroomImg1.webp"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>

                    <p className="text-base text-theme leading-tight line-clamp-2 flex-1 max-w-[calc(100%-120px)] max-h-[42px]">
                      Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                      Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </Link>   

                  <Link href="#" className="flex gap-3 mb-4 popularBlogsitem">
                    <div className="relative w-[120px] min-w-[120px] h-[70px] rounded-md overflow-hidden">
                      <Image
                        src="/images/blog/corporateNewsroomImg1.webp"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>

                    <p className="text-base text-theme leading-tight line-clamp-2 flex-1 max-w-[calc(100%-120px)] max-h-[42px]">
                      Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                      Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </Link>              
                </div>

                {/* Archives */}       
                <div className=" bg-white p-4 rounded-2xl border border-theme/15 mt-6 archives-list">
                  <h5 className="text-18 text-theme  font-extrabold mb-3">Archives</h5>

                  {/* 2025 */}
                  <div
                    className="border-b border-theme/15 py-1 text-base  cursor-pointer hover:text-blue-600 flex justify-between flex-wrap text-theme items-center archives-list-item"
                    onClick={() => toggle("2025")}>
                    <span>2025</span>
                    <span className="text-2xl text-blue-600">{open === "2025" ? "-" : "+"}</span>
                  </div>
                  {open === "2025" && (
                    <div className="py-2 text-base text-ThemeParaColor">
                      <ul className="w-full flex flex-wrap gap-1.5" role="list">
                        {[
                          "January", "February",  "April", "May", 
                          "July", "August","October", "November", "December"
                        ].map((month, i) => (
                          <li key={month}>
                            <Link
                              href={`/blog?year=2025&month=${i + 1}`}
                              className="block w-full py-1.5 px-2 rounded-md hover:bg-theme/10 hover:text-theme transition-colors text-sm"
                            >
                              {month}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 2024 */}
                  <div
                    className="border-b border-theme/15 py-3 text-theme text-base cursor-pointer hover:text-blue-600 flex justify-between items-center archives-list-item"
                    onClick={() => toggle("2024")}
                  >
                    <span>2024</span>
                    <span className="text-2xl text-blue-600">{open === "2024" ? "-" : "+"}</span>
                  </div>
                  {open === "2024" && (
                    <div className="py-2 text-base text-ThemeParaColor">
                      <ul className="w-full flex flex-wrap gap-1.5" role="list">
                        {[
                          "January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"
                        ].map((month, i) => (
                          <li key={month}>
                            <Link
                              href={`/blog?year=2024&month=${i + 1}`}
                              className="block w-full py-1.5 px-2 rounded-md hover:bg-theme/10 hover:text-theme transition-colors text-sm"
                            >
                              {month}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 2023 */}
                  <div
                    className="border-b border-theme/15 text-theme py-3 text-base cursor-pointer hover:text-blue-600 flex justify-between items-center archives-list-item"
                    onClick={() => toggle("2023")}
                  >
                    <span>2023</span>
                    <span className="text-2xl text-blue-600">{open === "2023" ? "-" : "+"}</span>
                  </div>
                  {open === "2023" && (
                    <div className="py-2 text-base text-ThemeParaColor">
                      <ul className="w-full flex flex-wrap gap-1.5" role="list">
                        {[
                          
                          "July", "August", "September", "October", "November", "December"
                        ].map((month, i) => (
                          <li key={month}>
                            <Link
                              href={`/blog?year=2023&month=${i + 1}`}
                              className="block w-full py-1.5 px-2 rounded-md hover:bg-theme/10 hover:text-theme transition-colors text-sm"
                            >
                              {month}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Repeat for remaining years */}
                </div>

              </aside>
            </div>  
          </div>
        </div>  
      </section>    

      <ClientStories />  
    </section>  
    </>
  );
}
