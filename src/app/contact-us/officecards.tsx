import React from "react";
import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";

const OfficeCards = () => {
  const { sectionRef, headingRef } = useHeadingAnimation();

  return (
    <section className="common-pb ">

                    {/* Heading */}
       <div className="container-fluid m-auto px-6 md:px-0 relative z-10 mb-10 md:mb-20">
                <div ref={sectionRef} className="w-full">
                    <div
                        ref={headingRef}
                        className="title-section text-center flex flex-col justify-center w-full max-w-full md:max-w-4xl mx-auto"
                    >
                        <h2 className="text-h2 leading-none">
                            General {" "}
                            <span className="font-subFont text-corinthiaHeading text-brown">
                                Information 
                            </span>
                        </h2>

                    </div>
                </div>
      </div>
      
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:px-44 ">

          {/* Registered Office */}
          <div className="border border-[#d9d9d9] rounded-[30px] p-8 lg:p-12 bg-transparent">

            <h3 className="text-22 font-semibold  mb-8">
              Registered Office
            </h3>

            <ul className="space-y-7">

             {/* Address */}
                    <li className="flex items-start gap-4">

                    {/* Icon */}
                    <div className="shrink-0 mt-1">
                        <img
                        src="/images/contact-us/location.svg"
                        alt="Location Icon"
                        className="w-6 h-6 object-contain"
                        />
                    </div>

                    {/* Content */}
                    <div>

                        <p >
                        Pellentesque sit amet congue ipsum. Aliquam risus nunc,
                        egestas ac nunc nec, venenatis hendrerit arcu. Ut at quam
                        molestie ligula consectetur posuere ut vitae urna. Fusce
                        facilisis, velit sed auctor
                        </p>

                    </div>

                    </li>

                    {/* Phone */}
                    <li className="flex items-center gap-4">

                    {/* Icon */}
                    <div className="shrink-0">
                        <img
                        src="/images/contact-us/call.svg"
                        alt="Phone Icon"
                        className="w-6 h-6 object-contain"
                        />
                    </div>

                    {/* Content */}
                    <div>

                        <a
                        href="tel:18001029880"
                        className="text-[18px] text-[#222]"
                        >
                        1800 102 9880
                        </a>

                    </div>

                    </li>

                    {/* Email */}
                    <li className="flex items-center gap-4">

                    {/* Icon */}
                    <div className="shrink-0">
                        <img
                        src="/images/contact-us/mail.svg"
                        alt="Mail Icon"
                        className="w-6 h-6 object-contain"
                        />
                    </div>

                    {/* Content */}
                    <div>

                        <a
                        href="mailto:fenesta@fenesta.com"
                        className="text-[18px] text-[#00aeef] relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#00aeef] after:transition-all after:duration-300 hover:after:w-full"
                        >
                        fenesta@fenesta.com
                        </a>

                    </div>

                    </li>

            </ul>

          </div>

          {/* Corporate Office */}
          <div className="border border-[#d9d9d9] rounded-[30px] p-8 lg:p-12 bg-transparent">

            <h3 className="text-22  font-semibold mb-8">
              Corporate Office
            </h3>

            <ul className="space-y-7">

                {/* Address */}
            <li className="flex items-start gap-4">

            {/* Icon */}
            <div className="shrink-0 mt-1">
                <img
                src="/images/contact-us/location.svg"
                alt="Location Icon"
                className="w-6 h-6 object-contain"
                />
            </div>

            {/* Content */}
            <div>

                <p >
                Pellentesque sit amet congue ipsum. Aliquam risus nunc,
                egestas ac nunc nec, venenatis hendrerit arcu. Ut at quam
                molestie ligula consectetur posuere ut vitae urna. Fusce
                facilisis, velit sed auctor
                </p>

            </div>

            </li>

            {/* Phone */}
            <li className="flex items-center gap-4">

            {/* Icon */}
            <div className="shrink-0">
                <img
                src="/images/contact-us/call.svg"
                alt="Phone Icon"
                className="w-6 h-6 object-contain"
                />
            </div>

            {/* Content */}
            <div>

                <a
                href="tel:18001029880"
                className="text-[18px] text-[#222]"
                >
                1800 102 9880
                </a>

            </div>

            </li>

            {/* Email */}
            <li className="flex items-center gap-4">

            {/* Icon */}
            <div className="shrink-0">
                <img
                src="/images/contact-us/mail.svg"
                alt="Mail Icon"
                className="w-6 h-6 object-contain"
                />
            </div>

            {/* Content */}
            <div>

                <a
                href="mailto:fenesta@fenesta.com"
                className="text-[18px] text-[#00aeef] relative inline-block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#00aeef] after:transition-all after:duration-300 hover:after:w-full"
                >
                fenesta@fenesta.com
                </a>

            </div>

            </li>

            </ul>

          </div>

        </div>

      </div>

    </section>
  );
};

export default OfficeCards;