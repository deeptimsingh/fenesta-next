import BlogAllPostsGrid from "@/components/templates/blogPage/BlogAllPostsGrid";
import type { BlogCategoryKey } from "@/components/templates/blogPage/BlogAllPostsGrid";

export default function BlogCategoryContent({
  category,
}: {
  category: BlogCategoryKey;
}) {
  return <BlogAllPostsGrid category={category} />;
}
