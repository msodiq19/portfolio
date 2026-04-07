import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Sodiq Muhammed",
  description:
    "Writing on frontend architecture, backend systems, security, and hard-won lessons from building production software.",
  openGraph: {
    title: "Blog — Sodiq Muhammed",
    description:
      "Writing on frontend architecture, backend systems, security, and hard-won lessons from building production software.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-listing">
      <div className="blog-listing-header">
        <Link href="/" className="blog-back-link">
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
        <p className="section-label">Blog</p>
        <h1 className="blog-listing-title">
          Thinking in <span className="gradient-text">public</span>
        </h1>
        <p className="blog-listing-subtitle">
          Frontend architecture, backend design, security thinking, and lessons from building fullstack systems.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="blog-empty">
          <p>No posts yet. Check back soon.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} featured={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
