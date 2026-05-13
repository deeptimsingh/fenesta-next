"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const tabTrackRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 6, width: 0 });

  // Update sliding pill position when activeTab or layout changes (smooth move)
  const updatePill = () => {
    const track = tabTrackRef.current;
    if (!track) return;
    const activeBtn = track.querySelector<HTMLButtonElement>(
      activeTab === "awards" ? "[data-tab=awards]" : "[data-tab=accreditations]"
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
    activeTab === "awards"
      ? "We are proud to have received several prestigious awards and accolades over the years. Below are some of our recent recognitions."
      : "Our accreditations reflect our commitment to quality, safety, and performance across products and processes.";

  return (
    <div className="content-wrapper content-over-banner InThisNews">
      <div className="container">
        <div className=" intro-heightlight mx-auto flex flex-row d:flex-col flex-wrap  gap-x-10 items-start -mt-[40px] sm:-mt-[60px] rounded-sm bg-white dark:bg-theme sm:p-6 relative z-20 common-pb">
          <div className="page-intro text-center">          
            <p className="text-22 text-theme dark:text-white">
              Fenesta is the proud recipient of prestigious industry awards and accolades that recognise the company’s efforts and achievements over the years. It’s the motivation we need to innovate, improve, and push boundaries in the pursuit of excellence.
            </p>
          </div>

          
          <div className="tab-outer flex justify-center mt-10 w-full">
            <div
              ref={tabTrackRef}
              className="tab-outer-inner relative inline-flex rounded-full bg-theme/20 p-1.5 gap-1 text-22 2xl:text-xl leading-normal"
            >
              {/* Sliding capsule background */}
              <div
                className="tab-bg-move absolute top-1.5 bottom-1.5 rounded-full bg-theme/80 transition-[left,width] duration-300 ease-out"
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                }}
                aria-hidden
              />
              <button
                data-tab="awards"
                type="button"
                onClick={() => setActiveTab("awards")}
                className={`relative z-10 py-2.5 px-5 2xl:px-6 rounded-full font-medium transition-colors duration-200 ${
                  activeTab === "awards"
                    ? "text-white"
                    : "text-neutral-500"
                }`}
              >
                Awards
              </button>

              <button
                data-tab="accreditations"
                type="button"
                onClick={() => setActiveTab("accreditations")}
                className={`relative z-10 py-3 px-5 2xl:px-6 rounded-full font-medium transition-colors duration-200 ${
                  activeTab === "accreditations"
                    ? "text-white"
                    : "text-neutral-500"
                }`}
              >
                Accreditations
              </button>
            </div>
          </div>

          

          <p className="pressDescription text-center text-theme text-22 max-w-3xl mx-auto mt-10 w-full">
            {description}
          </p>

          {(activeTab === "awards" || activeTab === "accreditations") && (
            <div
              key={activeTab}
              className="press-card-outer flex flex-wrap justify-center mt-10"
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
