import { useHeadingAnimation } from "@/hooks/useHeadingAnimation";



type SlideItem = {
  title: string;
  image?: string;   
  video?: string;
  type?: "image" | "video";
};

export default function Whyexperts() {
    const { headingRef, sectionRef } = useHeadingAnimation();

 
  return (
    <section className="common-padding w-full flex flex-col items-center whyExperts-section">
        {/**ICON LAYOUT**/}
     
    </section>
  );
}


