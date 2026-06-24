import BannerMain from "./bannerMain";

import FenestaEdit from "@/components/FenestaEdit";
import HaveQuestion from "@/components/base/HaveQuestion";


import Productstyleswrap from "./productstyleswrap";
import Idealuse from "./idealuse";
import Whyexpertswrap from "./whyexpertswrap";
import Imagegallerywrap from "./imagegallerywrap";
import DesignedLiving from "./designedLiving";



export default function WindowsPage() {


  return (
    <section className="about-page w-full">
      <BannerMain/>

      <Productstyleswrap/>
        <DesignedLiving/>
      <Whyexpertswrap/>
       <Imagegallerywrap/>
      <Idealuse/>
     
      <HaveQuestion/>
      <FenestaEdit/>

      <DesignedLiving/>
    </section>
  );
}
