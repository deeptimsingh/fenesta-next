import BannerMain from "@/components/templates/aboutPage/inthisnews/bannerMain";
import PressCard from "@/components/templates/aboutPage/inthisnews/PressCard";

import "@/components/templates/common.css";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function BlogPage() {
  

  return (
    <>  
    <section  className="inside-page w-full">
      <BannerMain /> 
      <PressCard /> 
    </section>  
    </>
  );
}
