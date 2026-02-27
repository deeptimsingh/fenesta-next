"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { initCardReveal } from "@/components/base/cardReveal";

export default function ProductCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = initCardReveal({
      container: containerRef.current,
      cardSelector: ".product-card",
      imageSelector: ".card-image",
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section className="product-list relative common-padding-md">
        <div className="container">
          <div className="product-list-content mx-auto ">  
            <div
              ref={containerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-[1vw]"
            >
              {/* WINDOWS */}
              <Card
                title="Windows"
                image="/images/productPage/product-img1.webp"
                links={[
                  { label: "uPVC Windows", href: "/product-page?category=windows&type=upvc" },
                  { label: "Aluminium Windows", href: "/product-page?category=windows&type=aluminium" },
                ]}
              />

              {/* DOORS */}
              <Card
                title="Doors"
                image="/images/productPage/product-img2.webp"
                links={[
                  { label: "uPVC Doors", href: "/product-page?category=doors&type=upvc" },
                  { label: "Aluminium Doors", href: "/product-page?category=doors&type=aluminium" },
                ]}
              />

              {/* FACADE */}
              <Card
                title="Facade"
                image="/images/productPage/product-img3.webp"
                links={[
                  { label: "Curtain Wall", href: "/product-page?category=facade&type=curtain-wall" },
                  { label: "Structural Glazing", href: "/product-page?category=facade&type=structural-glazing" },
                ]}
              />

              {/* ACCESSORIES */}
              <Card
                title="Accessories"
                image="/images/productPage/product-img4.webp"
                links={[
                  { label: "Handles", href: "/product-page?category=accessories&type=handles" },
                  { label: "Locks", href: "/product-page?category=accessories&type=locks" },
                ]}
              />  
            </div>
          </div>
        </div>
    </section>
  );
}

function Card({
  title,
  image,
  links = [],
}: {
  title: string;
  image: string;
  links?: { label: string; href: string }[];
}) 
{
    return (
    <div className="product-card group relative overflow-hidden rounded-2xl w-full cursor-pointer">
      <div className="relative h-[100vw] max-h-[357px] w-full overflow-hidden rounded-2xl bg-theme/40">
        {/* IMAGE */}
        <Image
          src={image}
          alt={title}
          fill
          className="card-image object-cover will-change-transform "
        />

        {/* GRADIENT OVERLAY — CSS transition: opacity 0→100% on group-hover (duration 500ms) */}
        <div
          className="gradient-overlay absolute inset-0 z-10 opacity-0 -translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none transition-[opacity,transform] duration-800 ease-out"
        />

        {/* CONTENT LAYER */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end text-white h-min-content">
          <div className="p-4 pb-0">
            {/* HOVER SUB CATEGORY — GSAP animates: translateY(6→0) + opacity(0→1) on hover */}
            <div className="hover-content mb-2 opacity-0 -translate-y-2 ">
              {links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="block text-base  font-medium text-white hover:underline py-1.5 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* TITLE + ARROW — Arrow: CSS opacity 0→100% on hover; GSAP adds scale + rotation */}
            <div className="title-button-container flex items-center justify-between bg-theme/50 group-hover:bg-theme/0  py-2 -mx-4 px-4 transition-all">
              <h4 className="text-h4 font-light leading-none">{title}</h4>
              <Link href={`/product-page?category=${encodeURIComponent(title.toLowerCase())}`} className="arrow-btn w-10 h-10 rounded-full bg-[#0288D1] flex items-center justify-center hover:bg-[#039BE5]  opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <Image src="/images/arrow-right.svg"  alt="" width={14} height={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
