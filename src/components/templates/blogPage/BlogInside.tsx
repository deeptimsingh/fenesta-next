"use client";

import {useEffect, useState } from "react";

import BannerMain from "@/components/templates/blogPage/bannerMain";
import CategoryFilter from "@/components/templates/blogPage/CategoryFilter";
import ClientStories from "@/app/home/ClientStories";
import "@/components/templates/blogPage/blogs.css";
import Image from "next/image";

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
  // const [headerHeight, setHeaderHeight] = useState(0);
  // useEffect(() => {
  //   const header = document.getElementById("site-header");
  //   if (!header) return;
  //   const updateHeight = () => setHeaderHeight(header.offsetHeight);
  //   updateHeight();
  //   window.addEventListener("resize", updateHeight);
  //   return () => window.removeEventListener("resize", updateHeight);
  // }, []);


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
          <div className="two-col flex gap-5">
            <div className="left-side  flex-1 max-w-[calc(100%-315px)]">               
                  
            </div>          

            {/* RIGHT SIDEBAR */}
            <aside className="max-w-[315px] hidden lg:block right-side  h-fit dynamic-sticky flex-1 ">

              {/* Subscribe */}
              <div className="bg-customBackgroundDarkGray  p-4 rounded-sm">
                <h5 className="text-basexs font-bold mb-3 text-center">Subscribe to our blog</h5>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Popular blogs */}
              <div className="bg-customBackgroundDarkGray p-4 rounded-sm mt-6 popularBlogs">
                <h5 className="text-basexs font-bold mb-3">Popular blogs</h5>

                <div className="flex gap-3 mb-4 popularBlogsitem">
                  <div className="relative w-[120px] min-w-[120px] h-[70px] rounded-md overflow-hidden">
                    <Image
                      src="/images/blog/corporateNewsroomImg1.webp"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="text-basexs text-gray-700 leading-tight line-clamp-3 flex-1 max-w-[calc(100%-120px)]  max-h-16">
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

                  <p className="text-basexs text-gray-700 leading-tight line-clamp-3 flex-1 max-w-[calc(100%-120px)]  max-h-16">
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

                  <p className="text-basexs text-gray-700 leading-tight line-clamp-3 flex-1 max-w-[calc(100%-120px)] max-h-16">
                    Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                    Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>              
              </div>

              {/* Archives */}       
              <div className="bg-customBackgroundDarkGray p-4 rounded-sm shadow-sm mt-6">
                <h5 className="text-basexs font-bold mb-3">Archives</h5>

                {/* 2025 */}
                <div
                  className="border-b py-3 text-base18 cursor-pointer hover:text-blue-600 flex justify-between  items-center"
                  onClick={() => toggle("2025")}>
                  <span>2025</span>
                  <span className="text-2xl text-blue-600">{open === "2025" ? "-" : "+"}</span>
                </div>
                {open === "2025" && (
                  <div className="pl-2 py-1 text-basexs leading-none text-ThemeParaColor">
                    <p>January (3)</p>
                    <p>February (5)</p>
                  </div>
                )}

                {/* 2024 */}
                <div
                  className="border-b py-3 text-base18 cursor-pointer hover:text-blue-600 flex justify-between items-center"
                  onClick={() => toggle("2024")}
                >
                  <span>2024</span>
                  <span className="text-2xl text-blue-600">{open === "2024" ? "-" : "+"}</span>
                </div>
                {open === "2024" && (
                  <div className="pl-2 py-1 text-basexs leading-none text-ThemeParaColor">
                    <p>June (4)</p>
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
