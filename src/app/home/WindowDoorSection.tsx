"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import FenestaButton from "@/components/base/FenestaButton";

type SlideItem = {
  title: string;
  image?: string;
  video?: string;
  type?: "image" | "video";
};

/**
 * PanoramaTabsSingle Component
 * 
 * Features:
 * - Swiper slider with images and videos
 * - Videos autoplay without controls (muted, loop, no play button)
 * - Images and videos are centered and static (only swiper-slide moves)
 * - Smooth transitions
 * - Videos play when visible, pause when not
 */
export default function PanoramaTabsSingle() {
  const tabs = ["By Space", "Our Collection"];
  const [activeTab, setActiveTab] = useState(0);

  // 🔥 Viewport visibility state
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'next' | 'prev' | null>(null);
  
  // 🔥 Heading animation with GSAP (using common defaults)
  const { headingRef, sectionRef } = useHeadingAnimation();

  // 🔥 Swiper fully ready flag
  const [sliderReady, setSliderReady] = useState(false);
  const swiperRef = useRef<any>(null);

  const sliderData: SlideItem[][] = [
    [
      { title: "Balcony", image: "/images/demo/room1.webp", type: "image" },
      { title: "Bathroom", image: "/images/demo/room2.webp", type: "image" },
      { title: "Bedroom", image: "/images/demo/room3.webp", type: "image" },
      { title: "Kitchen", image: "/images/demo/room4.webp", type: "image" },
      { title: "Living Room", image: "/images/demo/room5.webp", type: "image" },
    ],
    [
      { title: "Noise Control", image: "/images/demo/room1.webp", type: "image" },
      { title: "Thermal", video: "/images/demo/project-video.mp4", type: "video" },
      { title: "Security", image: "/images/demo/room3.webp", type: "image" },
      { title: "Weather Protection", video: "/images/demo/project-video.mp4", type: "video" },
    ],
    // [
    //   { title: "Sliding Window", image: "/images/demo/room1.webp", type: "image" },
    //   { title: "Casement Door", video: "/images/demo/project-video.mp4", type: "video" },
    //   { title: "Fixed Window", image: "/images/demo/room3.webp", type: "image" },
    //   { title: "Combination Door", video: "/images/demo/project-video.mp4", type: "video" },
    // ],
  ];

  const GHOST_COUNT = sliderData[activeTab].length;


  // 🔥 Detect when section enters/exits viewport (for Swiper)
  const swiperSectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isInViewport) {
              setIsInViewport(true);
              // Reset animation state when entering viewport
              setHasAnimated(false);
              // Add swiper-onview class when entering viewport
              if (swiperRef.current && swiperRef.current.el) {
                swiperRef.current.el.classList.add('swiper-onview');
              }
            }
          } else {
            if (isInViewport) {
              setIsInViewport(false);
              // Reset slides to stacked position when leaving viewport
              setHasAnimated(false);
              // Remove swiper-onview class when leaving viewport
              if (swiperRef.current && swiperRef.current.el) {
                swiperRef.current.el.classList.remove('swiper-onview');
              }
              if (swiperRef.current && swiperRef.current.slides) {
                try {
                  const slides = Array.from(swiperRef.current.slides || []);
                  slides.forEach((slide: any) => {
                    if (!slide) return;
                    
                    const isActive = slide.classList.contains('swiper-slide-active');
                    
                    // Remove animation classes
                    slide.classList.remove('slide-split-left', 'slide-split-right', 'slide-split-center', 'slide-active-anim');
                    
                    // All slides start centered (stacked at center)
                    slide.style.transform = 'translateX(0) translateZ(0)';
                    slide.style.opacity = '0';
                    slide.style.transition = 'none';
                    slide.style.pointerEvents = 'none';
                    if (isActive) {
                      slide.style.opacity = '1';
                    }
                  });
                } catch (error) {
                  console.warn('Error resetting slides:', error);
                }
              }
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    if (swiperSectionRef.current) {
      observer.observe(swiperSectionRef.current);
    }

    return () => {
      if (swiperSectionRef.current) {
        observer.unobserve(swiperSectionRef.current);
      }
    };
  }, [isInViewport]);

  // 🔥 Trigger split animation every time viewport is entered
  useEffect(() => {
    if (sliderReady && isInViewport && !hasAnimated) {
      // Wait a bit for Swiper to fully render, then trigger animation
      const timer = setTimeout(() => {
        // Add slides-animated class first to enable CSS transitions
        if (swiperRef.current && swiperRef.current.el) {
          swiperRef.current.el.classList.add('slides-animated');
        }
        
        // Small delay before setting hasAnimated to ensure CSS is ready
        requestAnimationFrame(() => {
          setHasAnimated(true);
        
        // Animate all slides to their positions - split from center
        if (swiperRef.current && swiperRef.current.slides) {
          try {
            const slides = Array.from(swiperRef.current.slides || []);
            const activeIndex = swiperRef.current.activeIndex || 0;
            
            slides.forEach((slide: any, index: number) => {
              if (!slide) return;
              
              const isActive = slide.classList.contains('swiper-slide-active');
              
              // Calculate position relative to active slide
              let relativeIndex = index - activeIndex;
              const distance = Math.abs(relativeIndex);
              
              if (isActive) {
                // Active slide stays centered, just fades in
                slide.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                slide.style.pointerEvents = '';
                slide.style.opacity = '1';
              } else {
                // Staggered delay - slides spread outward from center
                const delay = 0.3 + (distance * 0.1); // Start after 0.3s, then stagger
                
                // Enable smooth transition
                slide.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                slide.style.transitionDelay = `${delay}s`;
                slide.style.pointerEvents = '';
                
                // Trigger spread animation - remove centered transform to let Swiper position naturally
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    setTimeout(() => {
                      // Remove centered transform - Swiper will position it naturally
                      slide.style.transform = '';
                      slide.style.opacity = '1';
                      
                      // Clean up after animation completes
                      setTimeout(() => {
                        slide.style.transition = '';
                        slide.style.transitionDelay = '';
                      }, 1200 + delay * 1000);
                    }, delay * 1000);
                  });
                });
              }
            });
            
            // Clean up center slide class after animation
            setTimeout(() => {
              if (swiperRef.current && swiperRef.current.slides) {
                const slides = Array.from(swiperRef.current.slides || []);
                slides.forEach((slide: any) => {
                  if (slide && slide.classList) {
                    slide.classList.remove('slide-split-center');
                  }
                });
              }
            }, 1500);
          } catch (error) {
            console.warn('Error animating slides:', error);
          }
        }
        });
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [sliderReady, isInViewport, hasAnimated]);

  // Optional: hook to run any logic AFTER slider ready
  useEffect(() => {
    if (!sliderReady) return;
    console.log("✅ Swiper fully loaded & ready");
  }, [sliderReady]);

  return (
    <section ref={swiperSectionRef} className="common-padding w-full flex flex-col items-center  window-door-section white-gradient-background text-black">
      {/* Heading */}
      <div className="container-fluid m-auto px-6 md:px-0">
        <div ref={sectionRef} className="w-full">
          <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-3xl mx-auto ">
            <h2 className="text-h2 leading-none">
            Browse to find what <br/> feels right for <span className="font-subFont text-corinthiaHeading text-brown">your home</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Tabs */}
     
      <div className="flex gap-6 mb-6 mt-10 tabs-outer-container dark:bg-gray-900 dark:text-white">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-2 text-lg transition-all border-b-2 ${
              activeTab === index
                ? "text-brown border-[var(--color-brown)] font-bold dark:text-white dark:border-white"
                : "text-theme border-transparent font-medium dark:text-white dark:border-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Slider - Only load when in viewport */}
      <div className="relative w-full pb-10 -mt-5 overflow-hidden" style={{ perspective: '1200px', perspectiveOrigin: 'center center' }}>
        {isInViewport ? (
          <Swiper
            className={`PanoramaSwiper-slider ${hasAnimated ? 'slides-animated' : ''}`}
            loop
            centeredSlides
            parallax={true}
            freeMode={true}
            
            speed={1000}
            grabCursor
            slidesPerView={5}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 10 },
              640: { slidesPerView: 2.5, spaceBetween: 15 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}

            /* 🔹 Swiper instance created */
            onInit={(swiper) => {
              swiperRef.current = swiper;
              
              // Initially position all slides behind center (stacked)
              if (swiper.slides) {
                try {
                  const slides = Array.from(swiper.slides || []);
                  slides.forEach((slide: any) => {
                    if (!slide) return;
                    
                    const isActive = slide.classList.contains('swiper-slide-active');
                    
                    // All slides start centered (stacked at center position)
                    slide.style.transform = 'translateX(0) translateZ(0)';
                    slide.style.opacity = '0';
                    slide.style.transition = 'none';
                    slide.style.pointerEvents = 'none';
                    if (isActive) {
                      slide.style.opacity = '1';
                      slide.style.zIndex = '10';
                    }
                  });
                } catch (error) {
                  console.warn('Error positioning slides:', error);
                }
              }
              
              swiper.update();
              setSliderReady(true);
            }}

            /* 🔹 Handle slide change - detect direction and apply parallax */
            onSlideChangeTransitionStart={(swiper) => {
              if (!swiper || !swiper.slides) return;
              
              const direction = swiper.swipeDirection || (swiper.activeIndex > (swiper.previousIndex || 0) ? 'next' : 'prev');
              setSwipeDirection(direction);
              
              // Add animation classes based on slide position
              try {
                const slides = Array.from(swiper.slides || []);
                slides.forEach((slide: any) => {
                  if (!slide || !slide.classList) return;
                  
                  slide.classList.remove('slide-from-left', 'slide-from-right', 'slide-active-anim');
                  
                  if (slide.classList.contains('swiper-slide-active')) {
                    slide.classList.add('slide-active-anim');
                    if (direction === 'next') {
                      slide.classList.add('slide-from-right');
                    } else {
                      slide.classList.add('slide-from-left');
                    }
                  } else if (slide.classList.contains('swiper-slide-prev')) {
                    slide.classList.add('slide-from-left');
                  } else if (slide.classList.contains('swiper-slide-next')) {
                    slide.classList.add('slide-from-right');
                  }
                });
              } catch (error) {
                console.warn('Error applying slide animations:', error);
              }
            }}

            /* 🔹 Parallax animation on progress - smooth */
            onProgress={(swiper) => {
              if (!swiper || !swiper.slides) return;
              
              try {
                const slides = Array.from(swiper.slides || []);
                slides.forEach((slide: any) => {
                  if (!slide) return;
                  
                  const parallaxElement = slide.querySelector('.parallax-img, .parallax-video') as HTMLElement;
                  if (!parallaxElement) return;
                  
                  // Get slide progress (-1 to 1, where 0 is center)
                  const slideProgress = (slide as any).progress || 0;
                  
                  // Calculate parallax offset - move opposite to slide direction
                  // Parallax intensity: 200px max offset
                  const parallaxValue = -slideProgress * 200;
                  
                  // Use requestAnimationFrame for smooth updates
                  requestAnimationFrame(() => {
                    parallaxElement.style.transform = `translateX(${parallaxValue}px)`;
                  });
                });
              } catch (error) {
                // Silently handle errors
              }
            }}

            /* 🔹 Reset parallax on transition end */
            onSetTransition={(swiper, duration) => {
              if (!swiper || !swiper.slides || duration === 0) return;
              
              // Reset parallax during transition
              try {
                const slides = Array.from(swiper.slides || []);
                slides.forEach((slide: any) => {
                  if (!slide) return;
                  
                  const parallaxElement = slide.querySelector('.parallax-img, .parallax-video') as HTMLElement;
                  if (parallaxElement) {
                    parallaxElement.style.transition = 'none';
                  }
                });
              } catch (error) {
                // Silently handle errors
              }
            }}

            /* 🔹 Reset after transition */
            onTransitionEnd={(swiper) => {
              if (!swiper || !swiper.slides) return;
              
              // Reset parallax and animation classes
              try {
                const slides = Array.from(swiper.slides || []);
                slides.forEach((slide: any) => {
                  if (!slide) return;
                  
                  // Reset parallax
                  const parallaxElement = slide.querySelector('.parallax-img, .parallax-video') as HTMLElement;
                  if (parallaxElement) {
                    parallaxElement.style.transform = 'translateX(0px)';
                    parallaxElement.style.transition = '';
                  }
                  
                  // Remove animation classes
                  if (slide.classList) {
                    slide.classList.remove('slide-from-left', 'slide-from-right');
                  }
                });
              } catch (error) {
                console.warn('Error cleaning up slide classes:', error);
              }
            }}
          >
            {/* Real Slides */}
            {sliderData[activeTab].map((item, index) => (
              <SwiperSlide 
                key={`real-${index}`}
                className={hasAnimated ? 'slide-ready' : 'slide-hidden'}
              >
                <SlideCard item={item} index={index} />
              </SwiperSlide>
            ))}

            {/* Ghost Slides */}
            {sliderData[activeTab]
              .slice(0, GHOST_COUNT)
              .map((item, index) => (
                <SwiperSlide 
                  key={`ghost-${index}`}
                  className={hasAnimated ? 'slide-ready' : 'slide-hidden'}
                >
                  <SlideCard item={item} index={index + sliderData[activeTab].length} />
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <div className="relative w-full pb-10 -mt-5 overflow-hidden" style={{ minHeight: '25vw' }}>
            {/* Placeholder while not in viewport */}
          </div>
        )}
      </div>

      <div className="mt-5 sm:-mt-10  z-[1]">
        <FenestaButton>Explore our range</FenestaButton>
      </div>
    </section>
  );
}

/* ============================= */
/* SLIDE CARD                    */
/* ============================= */

function SlideCard({ item, index }: { item: SlideItem; index?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVideo = item.type === "video" || (item.video && !item.image);
  const mediaSrc = isVideo ? item.video : item.image;

  // Handle video play/pause on slide visibility for panorama effect
  useEffect(() => {
    if (!isVideo || !videoRef.current || !containerRef.current) return;

    const video = videoRef.current;
    
    const safePlay = () => {
      if (!video) return;
      
      // Check if video is actually visible and ready
      if (video.readyState >= 2 && document.visibilityState === 'visible') {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Handle AbortError (power-saving pause) and other errors silently
            if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
              // Only log non-expected errors
              console.debug('Video play interrupted:', error.name);
            }
          });
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            // Play video when slide is visible
            safePlay();
          } else {
            // Pause video when slide is not visible
            video.pause();
          }
        });
      },
      { 
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: '0px'
      }
    );

    observer.observe(containerRef.current);

    // Handle visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video.readyState >= 2) {
        safePlay();
      } else {
        video.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVideo]);

  // Ensure video starts playing when mounted (only if visible)
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    
    const video = videoRef.current;
    
    // Wait for video to be ready
    const tryPlay = () => {
      if (video.readyState >= 2 && document.visibilityState === 'visible') {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Handle AbortError (power-saving pause) silently
            if (error.name === 'AbortError' || error.name === 'NotAllowedError') {
              // Expected errors - browser blocking autoplay
              return;
            }
            // Try again on user interaction for other errors
            const handleInteraction = () => {
              video.play().catch(() => {});
              document.removeEventListener('click', handleInteraction);
              document.removeEventListener('touchstart', handleInteraction);
            };
            document.addEventListener('click', handleInteraction, { once: true });
            document.addEventListener('touchstart', handleInteraction, { once: true });
          });
        }
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true });
    }

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, [isVideo]);

  return (
    <div ref={containerRef} className="relative z-[10] overflow-hidden w-full h-full">
      {/* MEDIA CONTAINER - IMAGE OR VIDEO CENTERED AND STATIC */}
      <div className={`${isVideo ? "parallax-video" : "parallax-img"}`}>
        {isVideo && mediaSrc ? (
          <video
            ref={videoRef}
            src={mediaSrc}
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            style={{ 
              pointerEvents: 'none',
              display: 'block'
            }}
          />
        ) : mediaSrc ? (
          <Image
            src={mediaSrc}
            alt={item.title}
            width={900}
            height={600}
          />
        ) : null}
      </div>

      {/* CAPTION */}
      <div className="absolute bottom-4 left-0 w-full bg-gradient-to-t from-black/40 to-transparent backdrop-blur-sm pt-4 pb-10 flex justify-center z-[20]">
        <p className="text-white text-lg font-medium">{item.title}</p>
      </div>
    </div>
  );
}
