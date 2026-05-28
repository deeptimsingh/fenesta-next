"use client";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

export default function ContactForm() {
  const { sectionRef, headingRef } = useHeadingAnimation();

  return (
    <section className="py-16 bg-[#f5f5f5]">
        {/* Heading */}
       <div className="container-fluid m-auto px-6 md:px-0 relative z-10 mb-10 md:mb-20">
                <div ref={sectionRef} className="w-full">
                    <div
                        ref={headingRef}
                        className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto"
                    >
                        <h2 className="text-h2 leading-none">
                            Get {" "}
                            <span className="font-subFont text-corinthiaHeading text-brown">
                                in Touch 
                            </span>
                        </h2>

                    </div>
                </div>
      </div>

      <div className="container mx-auto px-4">

        <form>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

            {/* Name */}
            <div>
              <label className="block text-[18px] text-black mb-3">
                Name<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full h-[56px] appearance-none border border-gray-300 rounded-4xl px-4 py-2.5 pr-10 text-sm  text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[18px] text-black mb-3">
                Email<span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-[56px] px-5 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-black placeholder:text-[#8f8f8f] focus:outline-none  focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[18px] text-black mb-3">
                Phone number<span className="text-red-500">*</span>
              </label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full h-[56px] px-5 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-black placeholder:text-[#8f8f8f] focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300"
              />
            </div>

          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

            {/* Linkedin */}
            <div>
              <label className="block text-[18px] text-black mb-3">
                Linkedin profile link
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Enter your Linkedin link"
                className="w-full h-[56px] px-5 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-black placeholder:text-[#8f8f8f] focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300  "
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-[18px] text-black mb-3">
                Select city<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Enter your city"
                className="w-full h-[56px] px-5 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-black placeholder:text-[#8f8f8f] focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300"
              />
            </div>

            {/* Firm */}
            <div>
              <label className="block text-[18px] text-black mb-3">
                Firm name<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Enter your firm name"
                className="w-full h-[56px] px-5 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-black placeholder:text-[#8f8f8f] focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300"
              />
            </div>

          </div>

          {/* Captcha */}
          <div className="mb-8">

            <div className="w-[304px] h-[78px] bg-white border border-[#d9d9d9] rounded-[4px] flex items-center justify-between px-4 ">

              <div className="flex items-center">

                <input
                  type="checkbox"
                  className="w-5 h-5 mr-4 "
                />

                <p className="text-[14px] text-black">
                  I'm not a robot
                </p>

              </div>

              <div className="text-center">

                <img
                  src="/images/google-captcha.png"
                  alt=""
                  className="w-[36px] mx-auto mb-1"
                />

                <p className="text-[10px] text-[#666] leading-none">
                  reCAPTCHA
                </p>

              </div>

            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="inline-flex items-center gap-3 h-[54px] px-8 rounded-full bg-[#009FE3] text-white text-[15px] uppercase transition-all duration-300 hover:bg-black"
          >

            <span className="text-[20px] leading-none">
              →
            </span>

            Submit

          </button>

        </form>

      </div>

    </section>
  );
}