"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";

import FenestaButton from "@/components/base/FenestaButton";
import "./fenesta-image-gallery.css";

import { useImageParallax } from "@/hooks/useImageParallax";

const galleryImages = [
  {
    id: 1,
    image: "/images/fenesta-gallery/fenesta-image1.webp",
    href: "/products/windows",
    label: "Product Showcase",
  },
  {
    id: 2,
    image: "/images/fenesta-gallery/fenesta-image2.webp",
    href: "/products/casementwindows",
    label: "Product Showcase",
  },
  {
    id: 3,
    image: "/images/fenesta-gallery/fenesta-image3.webp",
    href: "/products/windows",
    label: "Product Showcase",
  },
  {
    id: 4,
    image: "/images/fenesta-gallery/fenesta-image4.webp",
    href: "/about-us",
    label: "Product Showcase",
  },
] as const;

function GalleryCardButton({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  return (
    <div className="fenesta-gallery-card__cta ">
      <FenestaButton href={href}>{label}</FenestaButton>
    </div>
  );
}

function GalleryCard({
  image,
  href,
  label,
  className,
}: {
  image: string;
  href: string;
  label: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useImageParallax(containerRef, imageWrapRef, {
    fromScale: 1.2,
    toScale: 1.2,
    fromY: -50,
    toY: 50,
    smooth: 0.08,
  });

  return (
    <div
      ref={containerRef}
      className={`fenesta-gallery-card group relative overflow-hidden rounded-[14px] ${className ?? ""}`}
    >
      <div
        ref={imageWrapRef}
        className="relative h-full w-full overflow-hidden will-change-transform"
        style={{ transformOrigin: "center" }}
      >
        <Image
          src={image}
          alt=""
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <GalleryCardButton href={href} label={label} />
    </div>
  );
}

export default function FenestaImageGallery() {
  return (
    <section className="fenestaImageGallery mt-6 w-full overflow-hidden">
      <div className="container mx-auto">
        <div className="hidden grid-cols-3 grid-rows-2 gap-4 md:grid">
          <GalleryCard
            image={galleryImages[0].image}
            href={galleryImages[0].href}
            label={galleryImages[0].label}
            className="row-span-2 min-h-[630px]"
          />

          <GalleryCard
            image={galleryImages[1].image}
            href={galleryImages[1].href}
            label={galleryImages[1].label}
            className="min-h-[295px]"
          />

          <GalleryCard
            image={galleryImages[2].image}
            href={galleryImages[2].href}
            label={galleryImages[2].label}
            className="min-h-[295px]"
          />

          <GalleryCard
            image={galleryImages[3].image}
            href={galleryImages[3].href}
            label={galleryImages[3].label}
            className="col-span-2 min-h-[300px]"
          />
        </div>

        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            slidesPerView="auto"
            centeredSlides
            spaceBetween={14}
            pagination={{ clickable: true }}
            className="product-gallery-swiper"
          >
            {galleryImages.map((item) => (
              <SwiperSlide key={item.id} className="!w-[82%]">
                <div className="fenesta-gallery-card fenesta-gallery-card--mobile group relative h-[420px] overflow-hidden rounded-[16px]">
                  <Image src={item.image} alt="" fill className="object-cover" />
                  <GalleryCardButton href={item.href} label={item.label} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
