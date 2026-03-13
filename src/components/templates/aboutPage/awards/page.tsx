import BannerMain from "@/components/templates/aboutPage/awards/bannerMain";
import PressCard from "@/components/templates/aboutPage/awards/PressCard";

import "@/components/templates/common.css";

export default function AwardsPage() {
return (
    <>  
      <section  className="inside-page w-full">
        <BannerMain /> 
        <PressCard /> 
      </section>  
    </>
  );
}
