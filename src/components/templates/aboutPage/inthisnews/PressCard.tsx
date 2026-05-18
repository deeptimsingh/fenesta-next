"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const tabTrackRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 6, width: 0 });

  // Update sliding pill position when activeTab or layout changes (smooth move)
  const updatePill = () => {
    const track = tabTrackRef.current;
    if (!track) return;
    const activeBtn = track.querySelector<HTMLButtonElement>(
      activeTab === "press" ? "[data-tab=press]" : "[data-tab=ads]"
    );
    if (!activeBtn) return;
    const trackRect = track.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    setPillStyle({
      left: btnRect.left - trackRect.left + track.scrollLeft,
      width: btnRect.width,
    });
  };
  useLayoutEffect(() => updatePill(), [activeTab]);
  useEffect(() => {
    const track = tabTrackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(updatePill);
    ro.observe(track);
    return () => ro.disconnect();
  }, [activeTab]);

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
        <div className="content-inside bg-white dark:bg-theme px-4 2xl:px-[5vw] common-pb">
          <div className="tab-outer flex justify-center">
            <div
              ref={tabTrackRef}
              className="tab-outer-inner relative inline-flex rounded-full bg-theme/20 p-1.5 gap-1 text-22 2xl:text-xl leading-normal"
            >
              {/* Sliding capsule background */}
              <div
                className="tab-bg-move absolute top-1.5 bottom-1.5 rounded-full bg-[#0094DA] transition-[left,width] duration-300 ease-out"
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                }}
                aria-hidden
              />
              <button
                data-tab="press"
                type="button"
                onClick={() => setActiveTab("press")}
                className={`relative z-10 py-2.5 px-5 2xl:px-6 rounded-full font-medium transition-colors duration-200 ${
                  activeTab === "press"
                    ? "text-white"
                    : "text-neutral-500"
                }`}
              >
                Press Coverage
              </button>
              <button
                data-tab="ads"
                type="button"
                onClick={() => setActiveTab("ads")}
                className={`relative z-10 py-3 px-5 2xl:px-6 rounded-full font-medium transition-colors duration-200 ${
                  activeTab === "ads"
                    ? "text-white"
                    : "text-neutral-500"
                }`}
              >
                Advertisement Centre
              </button>
            </div>
          </div>

          <p className="pressDescription text-center text-theme text-22 max-w-3xl mx-auto my-10">
            {description}
          </p>

          {(activeTab === "press" || activeTab === "ads") && (
            <div key={activeTab} className="press-card-outer flex flex-wrap justify-center" ref={containerRef}>
              {cards.map((item, index) => (
                <div key={`${activeTab}-${index}`} className={`press-card cardreveal ${index < visibleCards ? "block" : "hidden"}`}>
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
