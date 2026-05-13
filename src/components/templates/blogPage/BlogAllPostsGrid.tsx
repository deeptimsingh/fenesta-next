"use client";

import Image from "next/image";
import Link from "next/link";

export type BlogCategoryKey =
  | "windowsanddoor"
  | "homedecor"
  | "architectureanddesign"
  | "ecofridenly"
  | "smartcity"
  | "corporatenewsroom";

type BlogCard = {
  title: string;
  image: string;
  hoverImage: string;
  tag: string;
  date: string;
  readTime: string;
  category: BlogCategoryKey;
};

const BLOG_CARDS: BlogCard[] = [
  {
    title: "Trendy and Functional Door Designs for Homes in 2025",
    image: "/images/blog/windowDoorImg1.webp",
    hoverImage: "/images/blog/windowDoorImg1.webp",
    tag: "Windows & doors",
    date: "Nov 18, 2025",
    readTime: "9 Min Read",
    category: "windowsanddoor",
  },
  {
    title: "Design Tips: Using Glass Windows to Create a Spacious Look",
    image: "/images/blog/windowDoorImg2.webp",
    hoverImage: "/images/blog/windowDoorImg2.webp",
    tag: "Home Decor",
    date: "Nov 18, 2025",
    readTime: "9 Min Read",
    category: "homedecor",
  },
  {
    title: "Design Tips: Using Glass Windows to Create a Spacious Look",
    image: "/images/blog/windowDoorImg2.webp",
    hoverImage: "/images/blog/windowDoorImg2.webp",
    tag: "Eco-friendly home",
    date: "Nov 18, 2025",
    readTime: "9 Min Read",
    category: "ecofridenly",
  },
  {
    title: "Design Tips: Using Glass Windows to Create a Spacious Look",
    image: "/images/blog/windowDoorImg2.webp",
    hoverImage: "/images/blog/windowDoorImg2.webp",
    tag: "Smart City",
    date: "Nov 18, 2025",
    readTime: "9 Min Read",
    category: "smartcity",
  },
  {
    title: "Design Tips: Using Glass Windows to Create a Spacious Look",
    image: "/images/blog/windowDoorImg2.webp",
    hoverImage: "/images/blog/windowDoorImg2.webp",
    tag: "Windows & doors",
    date: "Nov 18, 2025",
    readTime: "9 Min Read",
    category: "windowsanddoor",
  },
  {
    title: "Design Tips: Using Glass Windows to Create a Spacious Look",
    image: "/images/blog/windowDoorImg2.webp",
    hoverImage: "/images/blog/windowDoorImg2.webp",
    tag: "Architecture & design",
    date: "Nov 18, 2025",
    readTime: "9 Min Read",
    category: "architectureanddesign",
  },
];

type BlogAllPostsGridProps = {
  category?: BlogCategoryKey;
};

/** Shared card grid for All + category pages */
export default function BlogAllPostsGrid({ category }: BlogAllPostsGridProps) {
  const cards = category ? BLOG_CARDS.filter((card) => card.category === category) : BLOG_CARDS;

  return (
    <div className="tab-content-in animate-slideUp">
      <div className="grid md:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <Link
            href="/blog/blog-inside"
            className="group block cursor-pointer"
            key={`${card.category}-${index}`}
          >
            <div className="reveal-card tab-content-item bg-white bg-lightdarkbase rounded-2xl overflow-hidden shadow-sm border border-theme/10 hover:shadow-md">
              <div className="reveal-img-wrapper relative overflow-hidden rounded-2xl">
                <Image
                  src={card.image}
                  alt={card.tag}
                  fill
                  data-hover={card.hoverImage}
                  className="object-cover reveal-img card-image project-img"
                />
                <span className="pointer-events-none absolute inset-0 z-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute left-1/2 top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue h-12 w-12 flex items-center justify-center shadow-lg opacity-0 scale-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-130 group-hover:-rotate-35">
                  <Image src="/images/arrow-right.svg" alt="" width={14} height={14} className="" />
                </span>
                <span className="tag absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#ffffff] bg-lightdarkbase text-14 font-normal px-5 py-1 rounded-tl-2xl rounded-tr-2xl shadow">
                  {card.tag}
                </span>
              </div>
              <div className="p-5">
                <p className="text-22 font-normal leading-tight text-theme">{card.title}</p>
                <div className="reveal-con flex items-center gap-10 text-14 text-theme/70 mt-3">
                  <div className="flex items-center gap-2">
                    <Image src="/images/blog/calender-icon.svg" alt="" width={16} height={16} />
                    {card.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Image src="/images/blog/clock-icon.svg" alt="" width={16} height={16} />
                    {card.readTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {cards.length === 0 && (
          <div className="reveal-card tab-content-item col-span-full bg-white bg-lightdarkbase rounded-2xl overflow-hidden shadow-sm border border-theme/10 p-6">
            <p className="text-theme/70">No blogs available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
