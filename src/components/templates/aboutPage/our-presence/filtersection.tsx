"use client";
/**
 * Our Presence – Office filter and slider.
 * Filter by Office + Location; results shown in a horizontal slider (1/2/4 cards per view by breakpoint).
 * Slider uses pixel-based translate and CSS vars for card width so slides align correctly on mobile and desktop.
 */

import { useState, useMemo, useEffect, useRef } from "react";
import CustomSelect from "@/components/templates/aboutPage/our-presence/CustomSelect";
import "@/components/templates/common.css";

// -----------------------------------------------------------------------------
// Dropdown options for Office and Location filters
// -----------------------------------------------------------------------------
const OFFICE_OPTIONS: string[] = [
  "Head Office",
  "Extrusion Factory",
  "Sales Office",
];

const LOCATION_OPTIONS: string[] = ["All", "Gurgaon", "Delhi"];

// Light blue icons for contact block (match theme #0094DA)
function ContactIcon({ type }: { type: "person" | "location" | "email" | "phone" }) {
  const className = "shrink-0 w-5 h-5  text-[#0094DA]";
  switch (type) {
    case "person":
      return (
        <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" />
      </svg>
      );
    case "location":
      return (
        <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M12 21s7-7.75 7-13a7 7 0 10-14 0c0 5.25 7 13 7 13z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
      );
    case "email":
      return (
        <svg
  className={className}
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  viewBox="0 0 24 24"
  aria-hidden
>
  <rect x="3" y="5" width="18" height="14" rx="2" />
  <path d="M3 7l9 6 9-6" />
</svg>
      );
    case "phone":
      return (
        <svg
  className={className}
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  viewBox="0 0 24 24"
  aria-hidden
>
  <path d="M22 16.92v3a2 2 0 01-2.18 2A19.86 19.86 0 013 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12.9.32 1.78.59 2.63a2 2 0 01-.45 2.11L9 9a16 16 0 006 6l.54-.54a2 2 0 012.11-.45c.85.27 1.73.47 2.63.59A2 2 0 0122 16.92z"/>
</svg>
      );
  }
}

// Shape of each office card: image, overlay labels, and contact block
type OfficeItem = {
  id: string;
  title: string;
  office: string;
  location: string;
  image: string;
  contactPerson: string;
  address: string;
  email: string;
  phone: string;
};

// Static list – replace with CMS/API later; add images under /images/about/our-presence/
const MOCK_OFFICES: OfficeItem[] = [
  {
    id: "1",
    title: "Head Office, Gurgaon",
    office: "Head Office",
    location: "Gurgaon",
    image: "/images/about/our-presence/img1.webp",
    contactPerson: "Poonam Bisht",
    address: "Fenesta studio, the GIP mall 2nd floor, shop no 209 sector 38, Noida 201301. Near sector 18 metro station, Uttar Pradesh",
    email: "response@fenesta.com",
    phone: "18001029880",
  },
  {
    id: "2",
    title: "Extrusion Factory, Gurgaon",
    office: "Extrusion Factory",
    location: "Gurgaon",
    image: "/images/about/our-presence/img2.webp",
    contactPerson: "Poonam Bisht",
    address: "Fenesta studio, the GIP mall 2nd floor,shop no 209 secor 38, nodia- 201301, utttar pradesh.",
    email: "response@fenesta.com",
    phone: "18001029880",
  },
  {
    id: "3",
    title: "Sales Office, Delhi",
    office: "Sales Office",
    location: "Delhi",
    image: "/images/about/our-presence/img3.webp",
    contactPerson: "Contact Person",
    address: "Address line, City, State - PIN.",
    email: "response@fenesta.com",
    phone: "18001029880",
  },
  {
    id: "4",
    title: "Head Office, Delhi",
    office: "Head Office",
    location: "Delhi",
    image: "/images/about/our-presence/img4.webp",
    contactPerson: "Contact Person",
    address: "Address line, City, State - PIN.",
    email: "response@fenesta.com",
    phone: "18001029880",
  },
  {
    id: "5",
    title: "Sales Office, Gurgaon",
    office: "Sales Office",
    location: "Gurgaon",
    image: "/images/about/our-presence/img5.webp",
    contactPerson: "Poonam Bisht",
    address: "Fenesta studio, the GIP mall 2nd floor, shop no 209 sector 38, Noida 201301.",
    email: "response@fenesta.com",
    phone: "18001029880",
  },
];

export default function OfficeFilter() {
  // -------------------------------------------------------------------------
  // Filter state: selected Office and Location
  // -------------------------------------------------------------------------
  const [office, setOffice] = useState("");
  const [location, setLocation] = useState("");

  // Apply filters (e.g. for future API or local filter logic)
  const handleSubmit = () => {
    console.log("Office:", office);
    console.log("Location:", location);
  };

  // Reset both dropdowns
  const handleClear = () => {
    setOffice("");
    setLocation("");
  };

  // List of offices after applying Office + Location filters
  const filteredOffices = useMemo(() => {
    return MOCK_OFFICES.filter((item: OfficeItem) => {
      const matchOffice = !office || item.office === office;
      const matchLocation = !location || location === "All" || item.location === location;
      return matchOffice && matchLocation;
    });
  }, [office, location]);

  // -------------------------------------------------------------------------
  // Slider state and refs
  // -------------------------------------------------------------------------
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  const sliderRef = useRef<HTMLDivElement>(null);   // Slider track (moving part)
  const wrapperRef = useRef<HTMLDivElement>(null);  // Visible viewport (overflow hidden)
  const startX = useRef(0);                         // For drag/swipe start position
  const isDragging = useRef(false);                 // Whether user is actively dragging
  const [slideOffsetPx, setSlideOffsetPx] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);    // Live drag distance in px

  // Refs so ResizeObserver and callbacks always see latest values
  const currentSlideRef = useRef(currentSlide);
  const cardsPerViewRef = useRef(cardsPerView);
  currentSlideRef.current = currentSlide;
  cardsPerViewRef.current = cardsPerView;

  // Set cards per view by breakpoint: 1 (<640px), 2 (640–1023px), 4 (≥1024px)
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1180) setCardsPerView(2);
      else if (window.innerWidth < 1280) setCardsPerView(3);
      else setCardsPerView(4);
    };

    updateCards();
    window.addEventListener("resize", updateCards);

    return () => window.removeEventListener("resize", updateCards);
  }, []);

  // Compute slide offset and card width in pixels so one slide = one view (no cut-off on mobile/desktop)
  const updateSlideOffset = () => {
    const wrapper = wrapperRef.current;
    const track = sliderRef.current;
    if (!wrapper || !track || filteredOffices.length === 0) return;

    const style = getComputedStyle(wrapper);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    const containerWidth = wrapper.clientWidth - paddingLeft - paddingRight;
    if (containerWidth <= 0) return;

    const gapPx = parseFloat(getComputedStyle(track).gap) || 24;
    const n = cardsPerViewRef.current;
    const cardWidthPx = (containerWidth - (n - 1) * gapPx) / n;
    const stepPx = cardWidthPx + gapPx;

    wrapper.style.setProperty("--filter-slider-card-width", `${cardWidthPx}px`);
    wrapper.style.setProperty("--filter-slider-gap-px", `${gapPx}px`);
    setSlideOffsetPx(currentSlideRef.current * stepPx);
  };

  // Recompute offset when slide index, cards per view, or result count changes
  useEffect(() => {
    updateSlideOffset();
  }, [currentSlide, cardsPerView, filteredOffices.length]);

  // Recompute when wrapper is resized (e.g. orientation, window resize)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(updateSlideOffset);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [filteredOffices.length]);

  // On mobile only: run again after a short delay so layout (padding/full-bleed) is applied
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 640) return;
    const t = setTimeout(updateSlideOffset, 100);
    return () => clearTimeout(t);
  }, [currentSlide, cardsPerView, filteredOffices.length]);

  // Reset to first slide when filter results change
  useEffect(() => {
    setCurrentSlide(0);
  }, [filteredOffices]);

  // Go to next slide (one “page” of cards)
  const nextSlide = () => {
    if (currentSlide < Math.max(filteredOffices.length - cardsPerView, 0)) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  // Go to previous slide
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // -------------------------------------------------------------------------
  // Drag / swipe: follow finger/mouse while dragging, snap to next/prev on release
  // -------------------------------------------------------------------------
  const handleStart = (x: number) => {
    isDragging.current = true;
    startX.current = x;
    setDragDelta(0);
  };

  const handleEnd = (x: number) => {
    if (!isDragging.current) return;
    const diff = startX.current - x;
    const threshold = 40; // slightly easier to trigger

    if (diff > threshold) nextSlide();
    else if (diff < -threshold) prevSlide();

    isDragging.current = false;
    setDragDelta(0);
  };

  const handleMove = (x: number) => {
    if (!isDragging.current) return;
    const diff = startX.current - x;
    setDragDelta(diff);
  };

  return (
    <>
      {/* ----------------------------------------------------------------------- */}
      {/* Filter bar: Office + Location dropdowns, Submit, Clear (responsive)     */}
      {/* ----------------------------------------------------------------------- */}
      <div className="filter-section w-full max-w-[960px] mt-5 mx-auto px-4 sm:px-0 relative z-10">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-end flex-wrap">

          <CustomSelect
            label="Office"
            // @ts-expect-error – CustomSelect options prop typed from JSX
            options={OFFICE_OPTIONS}
            value={office}
            onChange={setOffice}
            placeholder="Select office"
          />

          <CustomSelect
            label="Location"
            // @ts-expect-error – CustomSelect options prop typed from JSX
            options={LOCATION_OPTIONS}
            value={location}
            onChange={setLocation}
            placeholder="All"
          />

          <div className="flex items-center gap-2 shrink-0 justify-center sm:justify-start">
            <button
              onClick={handleSubmit}
              className="filter-submit-btn flex items-center gap-2 bg-[#1E90FF] text-white px-6 py-2 rounded-full h-[42px] text-sm sm:text-base"
            >
              <span>→</span>
              SUBMIT
            </button>
            {(office || location) && (
              <button
                onClick={handleClear}
                className="filter-clear-btn border border-gray-300 px-5 py-2 rounded-full h-[42px] text-sm sm:text-base"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ----------------------------------------------------------------------- */}
      {/* Results slider: cards in horizontal track, pixel-based translate          */}
      {/* Wrapper has overflow-hidden; track is translated by slideOffsetPx       */}
      {/* ----------------------------------------------------------------------- */}
      <div className="filter-slider-outer container">
        <div ref={wrapperRef} className="w-full mx-auto mt-8 sm:mt-10 relative overflow-hidden filter-slider-wrapper">
          {filteredOffices.length === 0 ? (
            <p className="text-center text-gray-500 py-8 px-4">
              No offices match the selected filters.
            </p>
          ) : (
            <div
              ref={sliderRef}
              className="filter-slider-track flex transition-transform duration-400 ease-out cursor-grab active:cursor-grabbing select-none"
              style={{ transform: `translateX(-${slideOffsetPx + dragDelta}px)` }}
              onMouseDown={(e) => handleStart(e.clientX)}
              onMouseMove={(e) => handleMove(e.clientX)}
              onMouseLeave={(e) => {
                if (isDragging.current) handleEnd(e.clientX);
              }}
              onMouseUp={(e) => handleEnd(e.clientX)}
              onTouchStart={(e) => handleStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
              onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
            >
              {filteredOffices.map((item: OfficeItem) => (
                <div
                  key={item.id}
                  className={`filter-slider-card filter-slider-card-per-view-${cardsPerView}`}
                >
                  {/* Top: image with location + office overlay */}
                  <div className="filter-slider-card-image-wrap relative aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">                      
                      <p className="text-white/90 text-14">{item.office}</p>
                      <p className="text-white font-semibold text-18">{item.location}</p>
                    </div>
                  </div>
                  

                  {/* Bottom: contact details with icons */}
                  <div className="filter-slider-card-details p-4 bg-white rounded-b-lg">
                    <p className="flex items-start gap-2 text-sm text-theme">
                      <ContactIcon type="person" />
                      <span>Contact person: <strong>{item.contactPerson}</strong></span>
                    </p>
                    <p className="flex items-start gap-2 text-sm text-theme">
                      <ContactIcon type="location" />
                      <span>{item.address}</span>
                    </p>
                    <p className="flex items-start gap-2 text-sm text-theme">
                      <ContactIcon type="email" />
                      <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                    </p>
                    <p className="flex items-start gap-2 text-sm text-theme">
                      <ContactIcon type="phone" />
                      <a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show nav arrows only when there is more than one slide (otherwise both would be disabled) */}
          {filteredOffices.length > cardsPerView && (
            <div className="slider-navigation absolute bottom-0 left-0 right-0 flex justify-center gap-4 items-center py-4">
              <button
                type="button"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="slider-nav-btn bg-theme border border-[#D9D9D9] rounded-full text-white w-10 h-10 shadow disabled:opacity-40 hover:bg-gray-50 hover:text-theme transition-all duration-300 ease-in-out"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={currentSlide >= Math.max(filteredOffices.length - cardsPerView, 0)}
                className="slider-nav-btn bg-theme border border-[#D9D9D9] rounded-full text-white w-10 h-10 shadow disabled:opacity-40 hover:bg-gray-50 hover:text-theme transition-all duration-300 ease-in-out"
                aria-label="Next"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}