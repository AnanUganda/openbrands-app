import { urlFor } from "@/lib/sanity";

export const BLOG_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  authorName,
  "categoryTitles": categories[]->title,
  categories
}`;

export interface DisplayPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  categories: string[];
  categoryDisplay: string;
  authorName?: string;
  imageUrl: string;
}

/** Maps raw Sanity posts onto the shape the blog listing and sidebars render. */
export function mapBlogPosts(sanityPosts: any[]): DisplayPost[] { // eslint-disable-line @typescript-eslint/no-explicit-any
  return sanityPosts.map((post) => {
    // Categories are plain strings on current posts and references on legacy ones,
    // so dereferenced titles come back as nulls for the string form and vice versa.
    const isString = (c: unknown): c is string => typeof c === "string";
    let cats: string[] = (post.categoryTitles || []).filter(isString);
    if (cats.length === 0) cats = (post.categories || []).filter(isString);
    if (cats.length === 0) cats = ["B2B Strategy"];

    return {
      _id: post._id,
      title: post.title,
      slug: post.slug?.current || "",
      publishedAt: post.publishedAt || new Date().toISOString(),
      excerpt: post.excerpt || "",
      categories: cats,
      categoryDisplay: cats.join(", ").toUpperCase(),
      authorName: post.authorName || "Open Brands Editorial",
      // Empty when the post has no image; the UI renders a branded panel instead.
      imageUrl: post.mainImage ? urlFor(post.mainImage).width(1200).height(800).url() : "",
    };
  });
}
