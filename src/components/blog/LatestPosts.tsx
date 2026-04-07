import { BlogPostMeta } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "@/app/blog.css";

interface LatestPostsProps {
  posts: BlogPostMeta[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" style={{ padding: "var(--section-padding) 0" }}>
      <div className="container">
        <p className="section-label">Blog</p>
        <h2 className="section-title" style={{ marginBottom: "8px" }}>
          Latest <span className="gradient-text">articles</span>
        </h2>
        <p className="section-subtitle" style={{ marginBottom: "48px" }}>
          Frontend architecture, backend systems, security, and lessons from building fullstack software.
        </p>

        <div className="latest-posts-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/blog"
            className="btn btn-ghost"
            style={{ fontSize: "14px" }}
          >
            View all posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
