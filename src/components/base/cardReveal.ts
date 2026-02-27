"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  container: HTMLElement | null;
  cardSelector: string;
  imageSelector: string;
};

export const initCardReveal = ({
  container,
  cardSelector,
  imageSelector,
}: RevealOptions) => {
  if (!container) return;

  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>(cardSelector);

    cards.forEach((card) => {
      const image = card.querySelector<HTMLElement>(imageSelector);
      if (!image) return;

      // Reset initial state
      gsap.set(card, { opacity: 0, y: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(card, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }).fromTo(
        image,
        { scale: 1.15, filter: "blur(20px)" },
        { scale: 1, filter: "blur(0px)", duration: 1.2 },
        0
      );
    });
  }, container);

  return ctx;
};