"use client";

import BannerMain from "@/components/templates/blogPage/bannerMain";
import BlogSidebar from "@/components/templates/blogPage/BlogSidebar";
import CategoryFilter from "@/components/templates/blogPage/CategoryFilter";
import ClientStories from "@/components/ClientStories-old";

export default function BlogListingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="inside-page w-full">
      <BannerMain />

      <section className="two-col-outer mx-auto w-full common-padding-md">
        <div className="container mx-auto">
          <div className="two-col flex flex-wrap gap-5">
            <div className="left-side flex-1 max-w-full lg:max-w-[calc(100%-315px)]">
              <CategoryFilter>{children}</CategoryFilter>
            </div>

            <BlogSidebar />
          </div>
        </div>
      </section>

      <ClientStories />
    </section>
  );
}
