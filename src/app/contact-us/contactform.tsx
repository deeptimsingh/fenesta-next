"use client";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

export default function ContactForm() {
  const { sectionRef, headingRef } = useHeadingAnimation();

  return (
    <section className="intro-section ">
            

      <div className="container mx-auto common-pb relative z-10">

        <div  className=" form-outer md:px-44 bg-white rounded-tl-[20px] rounded-tr-[20px] shadow-[0_8px_25px_rgba(0,0,0,0.04)] p-4 md:p-14 -mt-[100px] relative" >
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

        <form>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

            {/* Name */}
            <div>
              <label className="block text-[16px]  md:text-[18px] text-black mb-3">
                Name<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full h-[40] md:h-[56px] appearance-none border border-gray-300 rounded-4xl px-4 py-2.5 pr-10 text-sm  text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300"
              />
            </div>

             {/* Contact No */}
            <div>
              <label className="block text-[16px]  md:text-[18px] text-black mb-3">
                Contact No<span className="text-red-500">*</span>
              </label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full  h-[40] md:h-[56px] px-5 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-black placeholder:text-[#8f8f8f] focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[16px]  md:text-[18px] text-black mb-3">
                Email ID<span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-[40] md:h-[56px] px-5 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-black placeholder:text-[#8f8f8f] focus:outline-none  focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300"
              />
            </div>

           

          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

            {/* Country Dropdown */}
            <div>
              <label className="block text-[16px]  md:text-[18px] text-black mb-3">
                Select Country<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full h-[40] md:h-[56px] px-5 pr-12 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-[#8f8f8f] focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Select Country</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-4 h-4 text-[#8f8f8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* State Dropdown */}
            <div>
              <label className="block text-[16px]  md:text-[18px] text-black mb-3">
                Select State<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full h-[40] md:h-[56px] px-5 pr-12 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-[#8f8f8f] focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Select State</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="delhi">Delhi</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-4 h-4 text-[#8f8f8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* City Dropdown */}
            <div>
              <label className="block text-[16px]  md:text-[18px] text-black mb-3">
                Select City<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full h-[40] md:h-[56px] px-5 pr-12 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-[#8f8f8f] focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Select City</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="pune">Pune</option>
                  <option value="nagpur">Nagpur</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-4 h-4 text-[#8f8f8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
        
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 gap-6 mb-10">

            {/* Linkedin */}
            <div>
              <label className="block text-[16px]  md:text-[18px] text-black mb-3">
                Linkedin profile link
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Enter your Linkedin link"
                className="w-full h-[40] md:h-[56px] px-5 rounded-full border border-[#d9d9d9] bg-transparent text-[15px] text-black placeholder:text-[#8f8f8f] focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300  "
              />
            </div>
              {/* Query Field */}
            <div>
              <label className="block text-[16px]  md:text-[18px] text-black mb-3">
                Query
                <span className="text-red-500">*</span>
              </label>

              <textarea
                placeholder="Enter your query"
                rows={5}
                className="w-full px-5 py-4 rounded-[28px] border border-[#d9d9d9] bg-transparent text-[15px] text-black placeholder:text-[#8f8f8f] focus:outline-none focus:ring-2 focus:ring-[#00aeef] focus:border-[#00aeef] transition-all duration-300 resize-none"
              ></textarea>
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

      </div>

    </section>
  );
}