"use client";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import { initCardReveal } from "@/components/base/cardReveal";

const INITIAL_VISIBLE = 5;

type CardItem = { src: string; alt: string; title: string };

const PRESS_CARDS: CardItem[] = [
  { src: "/images/about/inthenews/news-img1.webp", alt: "news", title: "The Significance of design in fenestration" },
  { src: "/images/about/inthenews/news-img2.webp", alt: "news", title: "Fenesta Partner Showroom Launch at Meerut, UP" },
  { src: "/images/about/inthenews/news-img3.webp", alt: "news", title: "Fenesta Partner Showroom Launch at Kerala" },
  { src: "/images/about/inthenews/news-img4.webp", alt: "news", title: "Fenesta Partner Showroom Launch at Meerut, UP" },
  { src: "/images/about/inthenews/news-img5.webp", alt: "news", title: "Fenesta Partner Showroom Launch at Karnataka" },
  { src: "/images/about/inthenews/news-img6.webp", alt: "news", title: "Fenesta Partner Showroom Launch at Ahmedabad" },
  { src: "/images/about/inthenews/news-img7.webp", alt: "news", title: "Same Day Replacement Service" },
  { src: "/images/about/inthenews/news-img8.webp", alt: "news", title: "Fenesta Partner Showroom Launch at J&K" },
  { src: "/images/about/inthenews/news-img7.webp", alt: "news", title: "Same Day Replacement Service" },
  { src: "/images/about/inthenews/news-img8.webp", alt: "news", title: "Fenesta Partner Showroom Launch at J&K" },
];

const ADS_CARDS: CardItem[] = [
  { src: "/images/about/inthenews/news-img3.webp", alt: "news", title: "Fenesta Partner Showroom Launch at J&K" },
];

type PressCoverageProps = {
  pressCards?: CardItem[];
  adsCards?: CardItem[];
};

type TabId = "press" | "ads";

export default function PressCoverage({ pressCards = PRESS_CARDS, adsCards = ADS_CARDS }: PressCoverageProps) {
  const [visibleByTab, setVisibleByTab] = useState<Record<TabId, number>>({
    press: INITIAL_VISIBLE,
    ads: INITIAL_VISIBLE,
  });
  const [activeTab, setActiveTab] = useState<TabId>("press");

  const cards = activeTab === "press" ? pressCards : adsCards;
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
    activeTab === "press"
      ? "We are proud to have been featured in several leading publications of the country. Below are the links to our recent print media coverage"
      : "Fenesta regularly invests in smart marketing campaigns to build market share and leadership. Here's a collection of our past advertising campaigns.";

  return (
    <div className="content-wrapper content-over-banner InThisNews">
      <div className="container">
        <div className="content-inside bg-white p-4 2xl:p-6 rounded-tl-2xl rounded-tr-2xl">

          <div className="flex justify-center gap-6 2xl:gap-8 mb-6 mt-10 text-22 2xl:text-xl leading-normal">
            <button
              onClick={() => setActiveTab("press")}
              className={`pb-1 border-b-2 ${
                activeTab === "press"
                  ? "text-black border-black"
                  : "text-gray-400 border-transparent"
              }`}
            >
              Press Coverage
            </button>
            <button
              onClick={() => setActiveTab("ads")}
              className={`pb-1 border-b-2 ${
                activeTab === "ads"
                  ? "text-black border-black"
                  : "text-gray-400 border-transparent"
              }`}
            >
              Advertisement Centre
            </button>
          </div>

          <p className="pressDescription text-center text-theme text-22 max-w-3xl mx-auto mb-10">
            {description}
          </p>

          {(activeTab === "press" || activeTab === "ads") && (
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
                        className="w-full object-cover cardreveal-image"
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
