import React from 'react'
import FenestaButton from "@/components/base/FenestaButton";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";
import ProductStyles from "@/app/products/ProductStyles";

export default function Productstyleswrap() {
  const { headingRef, sectionRef } = useHeadingAnimation();


  return (
    <>
{/* Product Styles */}
      <section  className="common-padding w-full flex flex-col items-center  window-door-section white-gradient-background text-black">
        {/* Heading */}
        <div className="container-fluid m-auto px-6 md:px-0 relative z-10">
            <div ref={sectionRef} className="w-full">
                <div ref={headingRef} className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-3xl mx-auto">
                    <h2 className="text-h2 leading-none">
                        Product 
                        <span className="font-subFont text-corinthiaHeading text-brown">
                            Styles
                        </span>
                    </h2>
                </div>
            </div>
        </div>     

        <ProductStyles id="product-styles" />

        <div className="mt-5 sm:-mt-10 z-1">
          <FenestaButton href="#">Explore our range</FenestaButton>
        </div>
      </section>   
    </>
  )
}
