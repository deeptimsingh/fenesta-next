"use client";


import BannerMain from "./bannerMain";
import "../allproducts-style.css";

import FenestaEdit from "@/components/FenestaEdit";
import HaveQuestion from "@/components/base/HaveQuestion";

import Introsection from "./introsection";
import Productstyleswrap from "./productstyleswrap";
import Idealuse from "./idealuse";
import Whyexpertswrap from "./whyexpertswrap";
import Imagegallerywrap from "./imagegallerywrap";



export default function WindowsPage() {


  return (
    <section className="about-page w-full">
      <BannerMain/>
      <Introsection/>
      <Productstyleswrap/>
      <Whyexpertswrap/>
      <Idealuse/>
      <Imagegallerywrap/>
      <HaveQuestion/>
      <FenestaEdit/>
    </section>
  );
}
