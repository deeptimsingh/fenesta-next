"use client";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import { initCardReveal } from "@/components/base/cardReveal";

const INITIAL_VISIBLE = 5;

type CardItem = { src: string; alt: string; title: string };

const AWARDS_CARDS: CardItem[] = [
  { src: "/images/about/awards/img1.webp", alt: "news", title: "The Significance of design in fenestration" },
  { src: "/images/about/awards/img2.webp", alt: "news", title: "Fenesta Partner Showroom Launch at Meerut, UP" },
  { src: "/images/about/awards/img3.jpg", alt: "news", title: "Fenesta Partner Showroom Launch at Kerala" },
  { src: "/images/about/awards/img4.webp", alt: "news", title: "Fenesta Partner Showroom Launch at Meerut, UP" },
  { src: "/images/about/awards/img5.webp", alt: "news", title: "Fenesta Partner Showroom Launch at Karnataka" },
  { src: "/images/about/awards/img6.jpg", alt: "news", title: "Fenesta Partner Showroom Launch at Ahmedabad" },
  { src: "/images/about/awards/img7.webp", alt: "news", title: "Same Day Replacement Service" },
  { src: "/images/about/awards/img8.webp", alt: "news", title: "Fenesta Partner Showroom Launch at J&K" },
  { src: "/images/about/awards/img7.webp", alt: "news", title: "Same Day Replacement Service" },
];

const ACCREDITATIONS_CARDS: CardItem[] = [
  { src: "/images/about/awards/img3.jpg", alt: "news", title: "Fenesta Partner Showroom Launch at J&K" },
];

type AwardsProps = {
  awardsCards?: CardItem[];
  accreditationsCards?: CardItem[];
};

type TabId = "awards" | "accreditations";

export default function PressCoverage({ awardsCards = AWARDS_CARDS, accreditationsCards = ACCREDITATIONS_CARDS }: AwardsProps) {
  const [visibleByTab, setVisibleByTab] = useState<Record<TabId, number>>({
    awards: INITIAL_VISIBLE,
    accreditations: INITIAL_VISIBLE,
  });
  const [activeTab, setActiveTab] = useState<TabId>("awards");

  const cards = activeTab === "awards" ? awardsCards : accreditationsCards;
  const totalCards = cards.length;
  const visibleCards = Math.min(visibleByTab[activeTab], totalCards);
  const showLoadMore = totalCards > INITIAL_VISIBLE && visibleCards < totalCards;

  const containerRef = useRef<HTMLDivElement>(null);
  const revealCtxRef = useRef<ReturnType<typeof initCardReveal> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealCtxRef.current?.revert();
        revealCtxRef.current = initCardReveal({
          container,
          cardSelector: ".cardreveal",
          imageSelector: ".cardreveal-image",
        });
      });
    });
    return () => {
      cancelAnimationFrame(id);
      revealCtxRef.current?.revert();
      revealCtxRef.current = null;
    };
  }, [activeTab, visibleCards]);

  const handleLoadMore = () => {
    setVisibleByTab((prev) => ({
      ...prev,
      [activeTab]: Math.min(prev[activeTab] + 4, totalCards),
    }));
  };

  const description =
    activeTab === "awards"
      ? "We are proud to have been featured in several leading publications of the country. Below are the links to our recent print media coverage"
      : "Fenesta regularly invests in smart marketing campaigns to build market share and leadership. Here's a collection of our past advertising campaigns.";

  return (
    <div className="content-wrapper content-over-banner InThisNews">
      <div className="container">
        <div className="content-inside bg-white px-4 2xl:px-[5vw] rounded-tl-2xl rounded-tr-2xl">
          <div className="page-intro text-center">          
            <p className="text-22 text-theme">Fenesta is the proud recipient of prestigious industry awards and accolades that recognise the company’s efforts and achievements over the years. It’s the motivation we need to innovate, improve, and push boundaries in the pursuit of excellence.</p>
          </div>

          <div className="flex justify-center gap-6 2xl:gap-8 mb-6 mt-10 text-22 2xl:text-xl leading-normal">
            <button onClick={() => setActiveTab("awards")} className={`pb-1 border-b-2 ${activeTab === "awards" ? "text-black border-black" : "text-gray-400 border-transparent"
              }`}>Awards</button>

            <button onClick={() => setActiveTab("accreditations")} className={`pb-1 border-b-2 ${ activeTab === "accreditations"  ? "text-black border-black" : "text-gray-400 border-transparent"}`}>Accreditations</button>
          </div>

          <p className="pressDescription text-center text-theme text-22 max-w-3xl mx-auto mb-10">
            {description}
          </p>

          {(activeTab === "awards" || activeTab === "accreditations") && (
            <div
              key={activeTab}
              className="press-card-outer flex flex-wrap justify-center"
              ref={containerRef}
            >
              {cards.map((item, index) => (
                <div
                  key={`${activeTab}-${index}`}
                  className={`press-card cardreveal ${index < visibleCards ? "block" : "hidden"}`}
                >
                  <div className="press-card-inner">
                    <div className="press-card-image">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={400}
                        height={200}
                        className="w-full object-contain cardreveal-image"
                      />
                    </div>
                    <div className="press-card-text">
                      <p className="mt-2">{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showLoadMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                className="bg-blue-500 text-white text-sm px-6 py-2 rounded-full"
              >
                → LOAD MORE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
