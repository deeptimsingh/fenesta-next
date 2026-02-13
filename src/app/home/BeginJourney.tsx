"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function BeginJourney() {
    const { headingRef, sectionRef } = useHeadingAnimation();
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLElement | null)[]>([]);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);
    const backgroundImageRef = useRef<HTMLDivElement>(null);
    const sectionRefForBg = useRef<HTMLElement>(null);
    const animationsRef = useRef<any[]>([]);

    useEffect(() => {
        // Small delay to ensure DOM is fully rendered
        const timer = setTimeout(() => {
            if (!cardsContainerRef.current || !backgroundImageRef.current || !sectionRefForBg.current) return;

            const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
            const images = imagesRef.current.filter(Boolean) as HTMLDivElement[];
            
            if (cards.length === 0) return;

            // Clear previous animations
            animationsRef.current.forEach((anim) => {
                try {
                    if (anim && anim.kill) anim.kill();
                } catch (e) {
                    // Ignore cleanup errors
                }
            });
            animationsRef.current = [];

            try {
                // Refresh ScrollTrigger to ensure proper calculations
                ScrollTrigger.refresh();

                // Background image parallax on scroll
                if (backgroundImageRef.current && 
                    sectionRefForBg.current && 
                    backgroundImageRef.current.isConnected &&
                    sectionRefForBg.current.isConnected) {
                    try {
                        const bgAnim = gsap.to(backgroundImageRef.current, {
                            x: 150,
                            ease: "none",
                            scrollTrigger: {
                                trigger: sectionRefForBg.current,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1,
                                invalidateOnRefresh: true,
                            },
                        });
                        animationsRef.current.push(bgAnim);
                    } catch (error) {
                        console.warn("Error creating background animation:", error);
                    }
                }

                // Set initial state for images - positioned for parallax
                images.forEach((image) => {
                    if (image && image.parentElement && image.isConnected) {
                        try {
                            gsap.set(image, {
                                scale: 1,
                            });
                        } catch (e) {
                            // Ignore set errors
                        }
                    }
                });

                // Card animation - smooth slide-up on viewport entry
                const validCards = cards.filter(card => card && card.parentElement && card.isConnected);
                if (!validCards.length || !cardsContainerRef.current) return;

                // Kill any existing ScrollTriggers on this trigger
                ScrollTrigger.getAll().forEach((st) => {
                    if (st.vars && st.vars.trigger === cardsContainerRef.current) {
                        try {
                            st.kill();
                        } catch (e) {
                            // Ignore
                        }
                    }
                });

                try {
                    // INITIAL STATE (all cards hidden & down)
                    validCards.forEach((card) => {
                        if (!card || !card.parentElement || !card.isConnected) return;
                        
                        try {
                            gsap.set(card, {
                                opacity: 0,
                                y: 60,
                                scale: 0.95,
                                transformOrigin: "center",
                                force3D: true,
                            });
                        } catch (e) {
                            console.warn("Error setting card initial state:", e);
                        }
                    });

                    // SMOOTH SLIDE-UP ON CONTAINER ENTER
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: cardsContainerRef.current,
                            end: "top 10%",
                            scrub: false, // play once smoothly
                            toggleActions: "play none none reset",
                            invalidateOnRefresh: true,
                        },
                    });

                    tl.to(validCards, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5, // Faster duration (was 0.8)
                        ease: "power3.out",
                        stagger: 0.1, // Faster stagger - one-by-one slide up (was 0.2)
                        force3D: true,
                        
                    });

                    animationsRef.current.push(tl);
                } catch (error) {
                    console.warn("Error creating card animation:", error);
                }

                // Parallax effect for images within diamond clip-path
                images.forEach((image, index) => {
                    if (!image || !image.parentElement || !image.isConnected) return;
                    if (!cards[index] || !cards[index].parentElement || !cards[index].isConnected) return;

                    try {
                        const trigger = cards[index] || cardsContainerRef.current;
                        if (!trigger || !trigger.isConnected) return;

                        const imgAnim = gsap.to(image, {
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: trigger,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1,
                                invalidateOnRefresh: true,
                            },
                        });
                        animationsRef.current.push(imgAnim);
                    } catch (error) {
                        console.warn("Error creating image parallax animation:", error);
                    }
                });
            } catch (error) {
                console.warn("Error setting up animations:", error);
            }
        }, 50);

        return () => {
            clearTimeout(timer);
            
            // Kill all stored animations
            animationsRef.current.forEach((anim: any) => {
                try {
                    if (anim && typeof anim === 'object' && anim.kill && typeof anim.kill === 'function') {
                        // Check if animation is still active before killing
                        if (anim.isActive && typeof anim.isActive === 'function' && anim.isActive()) {
                            anim.kill();
                        } else {
                            // Try to kill anyway, but catch errors
                            try {
                                anim.kill();
                            } catch (killError) {
                                // Ignore kill errors for already dead animations
                            }
                        }
                    }
                } catch (e) {
                    // Ignore cleanup errors
                }
            });
            animationsRef.current = [];

            // Kill all ScrollTriggers related to this component
            ScrollTrigger.getAll().forEach((trigger) => {
                try {
                    if (trigger && trigger.vars && trigger.vars.trigger) {
                        const triggerEl = trigger.vars.trigger as HTMLElement;
                        if (triggerEl && (
                            triggerEl === cardsContainerRef.current || 
                            triggerEl === sectionRefForBg.current ||
                            triggerEl === backgroundImageRef.current ||
                            (sectionRef.current && triggerEl === sectionRef.current)
                        )) {
                            trigger.kill();
                        }
                    }
                } catch (e) {
                    // Ignore cleanup errors
                }
            });
            
            // Kill all tweens on cards and images - with better null checks
            cardsRef.current.forEach((card) => {
                if (card && card.parentElement && card.isConnected) {
                    try {
                        // Check if element has GSAP data before killing
                        if ((card as any)._gsap) {
                            gsap.killTweensOf(card);
                        }
                    } catch (e) {
                        // Ignore cleanup errors
                    }
                }
            });
            imagesRef.current.forEach((image) => {
                if (image && image.parentElement && image.isConnected) {
                    try {
                        if ((image as any)._gsap) {
                            gsap.killTweensOf(image);
                        }
                    } catch (e) {
                        // Ignore cleanup errors
                    }
                }
            });
            if (backgroundImageRef.current && backgroundImageRef.current.parentElement && backgroundImageRef.current.isConnected) {
                try {
                    if ((backgroundImageRef.current as any)._gsap) {
                        gsap.killTweensOf(backgroundImageRef.current);
                    }
                } catch (e) {
                    // Ignore cleanup errors
                }
            }
            
            // Kill tweens on headings
            if (cardsContainerRef.current && cardsContainerRef.current.isConnected) {
                try {
                    const headings = cardsContainerRef.current.querySelectorAll('h4');
                    headings.forEach((heading) => {
                        if (heading && heading.parentElement && heading.isConnected) {
                            try {
                                if ((heading as any)._gsap) {
                                    gsap.killTweensOf(heading);
                                }
                            } catch (e) {
                                // Ignore cleanup errors
                            }
                        }
                    });
                } catch (e) {
                    // Ignore cleanup errors
                }
            }
        };
    }, []);

  return (
    <section ref={sectionRefForBg} className="BeginJourney bg-darkbase w-full common-pt flex items-center justify-center overflow-hidden relative">     
      {/* Background Image */}
      <div ref={backgroundImageRef} className="backgroundImageRefimg absolute w-full z-2 right-0 left-auto h-[80%] max-w-[20vw] md:max-w-[40vw] mt-[-5%] -translate-y-1/2 top-1/2">
        <Image
          src="/images/home/profession/professionbg.svg"
          alt="Background"
          fill
          className="object-contain"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="container m-auto px-0 md:px-0 relative z-10 ">
        {/* Heading */}      
        <div ref={sectionRef} className="w-full max-w-lg title-section">          
          <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full">
            <h2 className="font-mainFont text-h2 leading-none "><span className="font-subFont text-corinthiaHeading text-brown leading-0">Begin </span> your journey  with Fenesta</h2>
            <div className="headingSubTitle flex flex-col justify-center w-full">  
              <p className="mt-3  max-w-full"> Tell us who you are, we’ll guide you from there</p>     
            </div>         
          </div>           
        </div>
        

        {/* Cards */}
        <div ref={cardsContainerRef} className="cardsContainer relative mt-10 mx-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-12 mr-0 sm:mr-[5vw] md:mr-[120px] xl:mr-[120px] mr-range-110 text-center">
          {/* Architect */}
          <Link 
            href="/architect"
            ref={(el) => { cardsRef.current[0] = el; }}
            className="group cardItem relative flex flex-col items-center cursor-pointer  hover:scale-105"
          >
            <div className="relative h-[45vw] w-[45vw] sm:h-[18vw] sm:w-[18vw] md:h-[18vw] md:w-[18vw] xl:h-[18vw] xl:w-[18vw]  diamond diamond-hover grayscale opacity-40 hover:opacity-100   hover:grayscale-0 overflow-hidden transition-all duration-300">
              <div ref={(el) => { imagesRef.current[0] = el; }}
                className="absolute inset-0 w-full h-full">
                <Image src="/images/home/profession/architect.webp" alt="Architect" fill className="object-cover transition-transform duration-300 group-hover:scale-110"  />
              </div>
            </div>            

            {/* Hover outline */}
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-[45vw] w-[45vw] sm:h-[18vw] sm:w-[18vw] md:h-[18vw] md:w-[18vw] xl:h-[18vw] xl:w-[18vw]   diamond-border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              viewBox="0 0 260 260" >
              <path d="M130 4 L256 130 L130 256 L4 130 Z" fill="none" stroke="#45bbff" strokeWidth="3" strokeLinejoin="miter" />
            </svg>

            <h4 className="mt-6 text-22 transition-colors text-theme opacity-40 font-bold group-hover:opacity-100">I’m an architect</h4>
          </Link>

          {/* Homeowner */}
          <Link 
            href="/homeowner"
            ref={(el) => { cardsRef.current[1] = el; }}
            className="group cardItem relative flex flex-col items-center cursor-pointer hover:scale-105"
          >
            <div className="relative h-[45vw] w-[45vw] sm:h-[18vw] sm:w-[18vw] md:h-[20vw] md:w-[20vw] xl:h-[18vw] xl:w-[18vw]  diamond diamond-hover grayscale opacity-40 hover:opacity-100   hover:grayscale-0 overflow-hidden transition-all duration-300">
             <div ref={(el) => { imagesRef.current[1] = el; }} className="absolute inset-0 w-full h-full" >
                <Image src="/images/home/profession/homeowner.webp" alt="homeowner" fill className="object-cover transition-transform duration-300 group-hover:scale-110"  />
              </div>
            </div>            

            {/* Hover outline */}
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-[45vw] w-[45vw] sm:h-[18vw] sm:w-[18vw] md:h-[20vw] md:w-[20vw] xl:h-[18vw] xl:w-[18vw]   diamond-border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              viewBox="0 0 260 260" >
              <path d="M130 4 L256 130 L130 256 L4 130 Z" fill="none" stroke="#45bbff" strokeWidth="3" strokeLinejoin="miter" />
            </svg>
            <h4 className="mt-6 text-22 transition-colors text-theme opacity-40 font-bold group-hover:opacity-100">I’m an homeowner</h4>           
          </Link>       

          

          {/* Builder */}
          <Link 
            href="/builder"
            ref={(el) => { cardsRef.current[2] = el; }}
            className="group cardItem relative flex flex-col items-center cursor-pointer hover:scale-105"
          >
           <div className="relative h-[45vw] w-[45vw] sm:h-[18vw] sm:w-[18vw] md:h-[20vw] md:w-[20vw] xl:h-[18vw] xl:w-[18vw] diamond diamond-hover grayscale opacity-40 hover:opacity-100   hover:grayscale-0 overflow-hidden transition-all duration-300">
           <div 
                ref={(el) => { imagesRef.current[2] = el; }}
                className="absolute inset-0 w-full h-full"
              >
                <Image src="/images/home/profession/builder.webp" alt="builder" fill className="object-cover transition-transform duration-300 group-hover:scale-110"  />
              </div>
            </div>            

            {/* Hover outline */}
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-[45vw] w-[45vw] sm:h-[18vw] sm:w-[18vw] md:h-[20vw] md:w-[20vw] xl:h-[18vw] xl:w-[18vw]   diamond-border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              viewBox="0 0 260 260" >
              <path d="M130 4 L256 130 L130 256 L4 130 Z" fill="none" stroke="#45bbff" strokeWidth="3" strokeLinejoin="miter" />
            </svg>
            <h4 className="mt-6 text-22 transition-colors text-theme opacity-40 font-bold group-hover:opacity-100">I’m an builder</h4>
          </Link>      


          
          {/* Exploring */}
          <Link 
            href="/exploring"
            ref={(el) => { cardsRef.current[3] = el; }}
            className="group cardItem relative flex flex-col items-center cursor-pointer hover:scale-105"
          >
            
            <div className="relative h-[45vw] w-[45vw] sm:h-[18vw] sm:w-[18vw] md:h-[20vw] md:w-[20vw] xl:h-[18vw] xl:w-[18vw]  diamond diamond-hover grayscale opacity-40 hover:opacity-100   hover:grayscale-0 overflow-hidden transition-all duration-300">
                <div 
                ref={(el) => { imagesRef.current[3] = el; }}
                className="absolute inset-0 w-full h-full"
              >
                <Image src="/images/home/profession/explore.webp" alt="Exploring" fill className="object-cover transition-transform duration-300 group-hover:scale-110"  />
              </div>
            </div>            

            {/* Hover outline */}
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-[45vw] w-[45vw] sm:h-[18vw] sm:w-[18vw] md:h-[20vw] md:w-[20vw] xl:h-[18vw] xl:w-[18vw]  diamond-border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              viewBox="0 0 260 260" >
              <path d="M130 4 L256 130 L130 256 L4 130 Z" fill="none" stroke="#45bbff" strokeWidth="3" strokeLinejoin="miter" />
            </svg>

            <h4 className="mt-6 text-22 transition-colors text-theme opacity-40 font-bold group-hover:opacity-100">I’m an exploring</h4>
          </Link>             
        </div>
      </div>
    </section>
  );
}
