"use client";

import {useEffect, useState, useRef } from "react";

import BannerMain from "@/components/templates/blogPage/Insidepage/bannerMain";
import ClientStories from "@/app/home/ClientStories";
import "@/components/templates/blogPage/Insidepage/blogsInside.css";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function BlogPage() {
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
    <section  className="inside-page w-full">
      <BannerMain />           
       
      <section className="two-col-outer mx-auto w-full common-padding-md">
        <div className="container mx-auto">
          <div className="two-col flex flex-wrap gap-5">
            {/* Left SIDEBAR */}
            <div className="left-side blog-left-side  flex-1 max-w-[calc(100%-315px)] -mt-[25vw] lg:mt-[-10vw] z-20 ">               
              <div className="blog-content bg-white bg-darkbase p-4 2xl:p-6 rounded-2xl h-full ">
                {/*Bread Crumbs */}
                <div className="flex items-center gap-2 text-theme/90 text-sm mb-5 breadcrumbs">
                    <span className="hover:text-white cursor-pointer ">Home</span>
                    <Image
                      src="/images/down-arrow.svg"
                      alt="arrow"
                      width={12}
                      height={12}
                      className="transform -rotate-90"
                    />
                    <span className="text-theme">Latest Blogs</span>
                </div>                

                <h1>uPVC Bathroom Windows: The Best Rust-Free Choice for the Monsoon Season</h1>

                <p>Creating a spacious home is not just about its square footage; it’s about smart, thoughtful design choices. Glass windows play a crucial role in bringing in natural light, adding visual depth, and creating seamless indoor-outdoor connections. With the right design, the benefits of glass windows in interior design can go beyond aesthetic appeal; they can completely transform how your space feels and functions.</p>

                <p>What Is the Role of Natural Light in Creating Spaciousness?</p>

                <p>Natural light brightens the walls, reduces shadows, and creates a bright and open atmosphere, which enhances the sense of volume and depth in a room. Glass windows also form a visual bridge to the outdoors. By extending your view beyond the walls of the space, windows trick the eye into perceiving the room as larger. As aluminium has become one of the most highly preferred fenestration materials today, it makes sense to choose t es that can completely transform any space and make it feel more expansive.</p>

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

                <h3>Ready to Transform Your Space with Aluminium Glass Windows?</h3>
                <p>Fenesta offers the best aluminium glass windows for homes, which have been designed to offer style, durability, and energy savings. Fenesta’s range of energy efficient aluminium windows has been designed with wide glass panels and sleek frames that can not only enhance the openness and spaciousness of a space but can also prevent heat transfer, ensuring comfortable indoor temperatures throughout the year.</p>

                <p>Fenesta offers customisable fenestration solutions, allowing you to choose from various options in size, style, design, colour, and finish, so you can find the perfect aluminium windows for different rooms, based on your size and design preferences with ease.</p>

                <p>Discover Fenesta’s range of high-quality aluminium windows with thermal break and make your space feel more spacious, brighter, and welcoming. Get in touch with our fenestration experts for a free consultation today!</p>
              </div>   
            </div>          

            {/* RIGHT SIDEBAR */}
            <aside className="max-w-full lg:max-w-[315px]   lg:block right-side  h-fit dynamic-sticky flex-1 ">
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

                <div className="flex gap-3 mb-4 popularBlogsitem">
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
                </div>

                <div className="flex gap-3 mb-4 popularBlogsitem">
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
                </div>

                <div className="flex gap-3 mb-4 popularBlogsitem">
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
                </div>   

                <div className="flex gap-3 mb-4 popularBlogsitem">
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
                </div>              
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
      </section>    

      <ClientStories />  
    </section>  
    </>
  );
}
