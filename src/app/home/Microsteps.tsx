"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

interface Behavior {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const behaviors: Behavior[] = [
  {
    id: 1,
    title: "Food",
    description: "Food choices influence our daily and long-term health, impacting our energy, gut health, blood sugar, inflammation, and mood.",
    icon: "🍎",
    color: "#FF6B6B",
  },
  {
    id: 2,
    title: "Movement",
    description: "Regular movement helps us improve circulation, reduce inflammation, and support mobility — and it doesn't have to be intense to have an impact.",
    icon: "🏃",
    color: "#4ECDC4",
  },
  {
    id: 3,
    title: "Sleep",
    description: "Sleep is foundational for health — supporting everything from brain and heart function to mood and metabolism — and it makes other healthy habits easier too.",
    icon: "😴",
    color: "#45B7D1",
  },
  {
    id: 4,
    title: "Stress Management",
    description: "Having tools to manage stress helps us manage our health more effectively, whether we're navigating busy lives or living with a chronic condition.",
    icon: "🧘",
    color: "#FFA07A",
  },
  {
    id: 5,
    title: "Connection",
    description: "Studies show that social support can help us achieve better health outcomes and navigate health conditions more effectively.",
    icon: "🤝",
    color: "#98D8C8",
  },
];

export default function Microsteps() {
  const [activeBehavior, setActiveBehavior] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const behaviorCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const circleIconsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Heading animation
  const { headingRef, sectionRef: headingSectionRef } = useHeadingAnimation();

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    // Animate behavior cards on scroll
    behaviorCardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );
    });

    // Animate circle icons on scroll
    circleIconsRef.current.forEach((icon, index) => {
      if (!icon) return;

      gsap.fromTo(
        icon,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Handle behavior click
  const handleBehaviorClick = (id: number) => {
    if (activeBehavior === id) {
      setActiveBehavior(null);
    } else {
      setActiveBehavior(id);
    }
  };

  const activeBehaviorData = behaviors.find((b) => b.id === activeBehavior);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="container-fluid m-auto px-6 md:px-0">
        {/* Heading */}
        <div ref={headingSectionRef} className="w-full mb-8 md:mb-12">
          <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-4xl mx-auto">
            <h2 className="font-mainFont text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
              Lasting behavior change starts with <span className="font-subFont text-corinthiaHeading text-brown">Microsteps</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Small daily changes focused on 5 key daily behaviors can lead to dramatic improvements in our health and wellbeing.
            </p>
          </div>
        </div>

        {/* Circle Icons Row - Similar to Thrive Global */}
        <div className="flex flex-wrap justify-center items-start gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16 px-4">
          {behaviors.map((behavior, index) => (
            <div
              key={behavior.id}
              ref={(el) => {
                circleIconsRef.current[index] = el;
              }}
              onClick={() => handleBehaviorClick(behavior.id)}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              {/* Circle Icon */}
              <div
                className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-3xl md:text-4xl lg:text-5xl transition-all duration-300 mb-3 ${
                  activeBehavior === behavior.id
                    ? "shadow-xl scale-110"
                    : "shadow-lg hover:shadow-xl hover:scale-105"
                }`}
                style={{
                  backgroundColor: activeBehavior === behavior.id ? behavior.color : "#FFFFFF",
                  border: `4px solid ${activeBehavior === behavior.id ? behavior.color : "#E8E8E8"}`,
                  transform: activeBehavior === behavior.id ? "scale(1.1)" : undefined,
                }}
              >
                <span className="filter drop-shadow-sm">{behavior.icon}</span>
              </div>

              {/* Label below icon */}
              <div className="text-center">
                <span className={`text-sm md:text-base font-medium transition-colors duration-300 ${
                  activeBehavior === behavior.id ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
                }`}>
                  {behavior.title}
                </span>
              </div>

              {/* Active indicator line */}
              {activeBehavior === behavior.id && (
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full transition-all duration-300"
                  style={{ backgroundColor: behavior.color }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Behavior Cards Grid - Similar to Thrive Global */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {behaviors.map((behavior, index) => (
            <div
              key={behavior.id}
              ref={(el) => {
                behaviorCardsRef.current[index] = el;
              }}
              onClick={() => handleBehaviorClick(behavior.id)}
              className={`group relative bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-t-4 ${
                activeBehavior === behavior.id
                  ? "shadow-xl scale-[1.02]"
                  : "hover:scale-[1.01]"
              }`}
              style={{
                borderTopColor: activeBehavior === behavior.id ? behavior.color : "#E8E8E8",
              }}
            >
              {/* Icon in card */}
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl mb-4 transition-all duration-300"
                style={{
                  backgroundColor: `${behavior.color}10`,
                }}
              >
                {behavior.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-mainFont text-gray-900 mb-3 font-semibold">
                {behavior.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {behavior.description}
              </p>

              {/* Hover effect overlay */}
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                  activeBehavior === behavior.id ? "opacity-10" : ""
                }`}
                style={{ backgroundColor: behavior.color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Expanded Active Behavior Card (Mobile/Tablet) */}
        {activeBehaviorData && isMobile && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 md:hidden">
            <div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
              style={{ borderTop: `4px solid ${activeBehaviorData.color}` }}
            >
              <button
                onClick={() => setActiveBehavior(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto"
                style={{ backgroundColor: `${activeBehaviorData.color}15` }}
              >
                {activeBehaviorData.icon}
              </div>
              <h3 className="text-2xl font-mainFont text-gray-900 mb-4 text-center">
                {activeBehaviorData.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed text-center">
                {activeBehaviorData.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
