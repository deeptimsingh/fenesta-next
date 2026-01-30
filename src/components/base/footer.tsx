"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterImage() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!footerRef.current || !contentRef.current) return;

    const footer = footerRef.current;
    const content = contentRef.current;

    // Find the main element to use as trigger
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    // Get footer height for calculations
    const footerHeight = footer.offsetHeight || 400;

    // Set initial state - footer positioned below viewport
    gsap.set(footer, {
      y: footerHeight,
      opacity: 0,
    });

    gsap.set(content, {
      opacity: 0,
      y: 50,
    });

    // Set initial state for background image
    if (imageRef.current) {
      gsap.set(imageRef.current, {
        opacity: 0,
        x: 50,
      });
    }

    // Create ScrollTrigger to detect when main content ends
    ScrollTrigger.create({
      trigger: mainElement,
      start: "bottom bottom",
      end: "bottom top",
      onEnter: () => {
        // Footer slides up into view
        gsap.to(footer, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });

        // Content fades up
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        });

        // Background image slides in
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.3,
          });
        }
      },
      onLeaveBack: () => {
        // Hide footer when scrolling back up
        gsap.to(footer, {
          y: footerHeight,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === mainElement || st.vars.trigger === footer) {
          st.kill();
        }
      });
    };
  }, []);


  return (
    <footer ref={footerRef} className="bg-[#1a1a1a] text-gray-300 pt-10 pb-6 relative overflow-hidden dark:bg-[#0b0b0b] transition-colors duration-200"> 
       <div className="absolute top-1/2 -right-[5vw] -translate-y-1/2">
        <Image
            ref={imageRef}
            src="/images/footer-bg.svg"
            className="w-[20vw] h-[90%]"
            alt="Footer Background"
            width={637}
            height={637}
        />
        </div>


      <div ref={contentRef} className="container mx-auto">
        <div className="footer-tp flex justify-between items-baseline mb-8 pb-3  border-b border-[#5E5E5E]">
            <div className="footer-bg-image">
                <Image src="/images/logo-white.svg" className="footer-logo" alt=""  width={230} height={70} />
            </div> 
            <Link href="#" className="flex items-center z-[1]"><Image src="/images/call.svg" className="me-1" alt=""  width={15} height={15} /> 18001029880</Link>
        </div>

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 tracking-normal">Contact Us</h4>
            <div className="space-y-3 text-basexs">
              <div className="flex items-start gap-2">
                <Image src="/images/map.svg" className="me-1" alt=""  width={15} height={15} />
                <p className="text-basexs text-white leading-normal">
                  Fenesta Building Systems, 2nd floor, Plot no 82, Sector 32, Gurugram,
                  Haryana 122001, India
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/images/email.svg" className="me-1" alt=""  width={15} height={15} />
                <a href="mailto:response@fenesta.com" className="hover:text-white text-basexs text-white leading-normal">
                  response@fenesta.com
                </a>
              </div>              
            </div>            
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white mb-4  tracking-normal">Products</h4>
            <ul className="space-y-2 text-basexs">
              {[
                { label: "Windows", href: "/" },
                    { label: "Doors", href: "/" },
                    { label: "Solid Panels", href: "/" },
                    { label: "Accessories", href: "/" },
                ].map((Productsitem, i) => (
                <li key={i}>
                    <Link href={Productsitem.href} className="hover:text-white">
                       {Productsitem.label}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h4 className="font-bold text-white mb-4  tracking-normal">Discover Fenesta</h4>
            <ul className="space-y-2 text-basexs">
              {[
                    { label: "About Fenesta", href: "/" },
                    { label: "Design Stories", href: "/" },
                    { label: "Why Fenesta", href: "/" },
                    { label: "Download Brochure", href: "/" },
                    { label: "Careers", href: "/" },
               ].map(
                (Discoveritem, i) => (
                  <li key={i}>
                    <Link href={Discoveritem.href} className="hover:text-white">
                       {Discoveritem.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-bold text-white mb-4  tracking-normal">More</h4>
            <ul className="space-y-2 text-basexs">
                {[
                    { label: "Visit our Signature Studios", href: "/" },
                    { label: "Find a Fenesta Partner", href: "/" },
                    { label: "Take a Virtual Tour", href: "/" },
                    { label: "Consumer Complaint", href: "/" },
                    { label: "Reach the Business Head", href: "/" },
                ].map((Moreitem, i) => (
                    <li key={i}>
                    <Link href={Moreitem.href} className="hover:text-white">
                        {Moreitem.label}
                    </Link>
                    </li>
                ))}
            </ul>

          
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-10 text-xs text-gray-500">
          {/* Social Icons */}
            <div className="mt-3">
              <h4 className="font-bold text-white mb-3 tracking-normal ">Connect With Us</h4>
              <div className="flex gap-4 text-lg">
                <Link href="#" className="hover:text-white"><Image src="/images/whatsapp.svg" className="w-full" width={25} height={25} alt="" /></Link>
                <Link href="#" className="hover:text-white"><Image src="/images/facebook.svg" className="" width={25} height={25} alt="" /></Link>
                <Link href="#" className="hover:text-white"><Image src="/images/twitter.svg" className="" width={25} height={25} alt="" /></Link>
                <Link href="#" className="hover:text-white"><Image src="/images/instagram.svg" className="" width={25} height={25} alt="" /></Link>
                <Link href="#" className="hover:text-white"><Image src="/images/YT.svg" className="" width={25} height={25} alt="" /></Link>
                <Link href="#" className="hover:text-white"><Image src="/images/instagram.svg" className="" width={25} height={25} alt="" /></Link>
                <Link href="#" className="hover:text-white"><Image src="/images/pinterest.svg" className="" width={25} height={25} alt="" /></Link>
                
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-3 z-[1]">
              <Link href="#" className="border border-gray-500 text-gray-300 hover:text-white hover:border-white px-4 py-2 text-sm transition">
                Locate Us
              </Link>
              <Link href="#" className="border border-gray-500 text-gray-300 hover:text-white hover:border-white px-4 py-2 text-sm transition">               
                Book a Consult
              </Link>
            </div>
        </div>   

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 text-xs text-gray-500 border-t border-gray-700 pt-6">
          <p>© {new Date().getFullYear()} Fenesta Building Systems. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4 mt-3 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Disclaimer</Link>
            <Link href="#" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
