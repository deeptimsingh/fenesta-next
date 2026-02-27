"use client";
import Image from "next/image";
import Link from "next/link";

import {useEffect, useState } from "react";
import BannerMain from "@/components/templates/blogPage/bannerMain";
import CategoryFilter from "@/components/templates/blogPage/CategoryFilter";
import ClientStories from "@/app/home/ClientStories";
import "@/components/templates/blogPage/blogs.css";


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

  return (
    <>  
    <section  className="inside-page w-full">
      <BannerMain />   
       
      <section className="two-col-outer mx-auto w-full common-padding-md">
        <div className="container mx-auto">
          <div className="two-col flex flex-wrap gap-5">
            <div className="left-side  flex-1 max-w-full lg:max-w-[calc(100%-315px)]">
              <CategoryFilter /> 
            </div>          

            {/* RIGHT SIDEBAR */}
            <aside className="max-w-full lg:max-w-[315px]  lg:block right-side  h-fit dynamic-sticky flex-1 ">
              {/* Subscribe */}
              <div className="p-4 rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <h5 className="text-18 font-extrabold mb-5 text-black">Subscribe to our blog</h5>
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
              <div className="bg-customBackgroundDarkGray p-4 rounded-2xl border border-theme/15 mt-6 popularBlogs">
                <h5 className="text-18 font-extrabold mb-3">Popular blogs</h5>

                <div className="flex gap-3 mb-4 popularBlogsitem">
                  <div className="relative w-[120px] min-w-[120px] h-[70px] rounded-md overflow-hidden">
                    <Image
                      src="/images/blog/corporateNewsroomImg1.webp"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="text-base text-theme leading-tight line-clamp-2 flex-1 max-w-[calc(100%-120px)]  max-h-[44px]">
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

                  <p className="text-base text-theme leading-tight line-clamp-2 flex-1 max-w-[calc(100%-120px)]  max-h-[44px]">
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

                  <p className="text-base text-theme leading-tight line-clamp-2 flex-1 max-w-[calc(100%-120px)] max-h-[44px]">
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

                  <p className="text-base text-theme leading-tight line-clamp-2 flex-1 max-w-[calc(100%-120px)] max-h-[44px]">
                    Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                    Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>              
              </div>

              {/* Archives */}       
              <div className="bg-customBackgroundDarkGray p-4 rounded-2xl border border-theme/15 mt-6">
                <h5 className="text-18 font-extrabold mb-3">Archives</h5>

                {/* 2025 */}
                <div
                  className="border-b border-theme/15 py-1 text-base  cursor-pointer hover:text-blue-600 flex justify-between flex-wrap  items-center"
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
                  className="border-b border-theme/15 py-3 text-base cursor-pointer hover:text-blue-600 flex justify-between items-center"
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
                  className="border-b border-theme/15 py-3 text-base cursor-pointer hover:text-blue-600 flex justify-between items-center"
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
