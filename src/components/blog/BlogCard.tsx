import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const date = new Date(post.frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className={`blog-card ${featured ? "blog-card-featured" : ""}`}>
      <article>
        <div className="blog-card-meta">
          <span className="blog-card-date">
            <Calendar size={13} />
            {date}
          </span>
          <span className="blog-card-reading-time">
            <Clock size={13} />
            {post.readingTime}
          </span>
        </div>

        <h3 className="blog-card-title">{post.frontmatter.title}</h3>
        <p className="blog-card-description">{post.frontmatter.description}</p>

        <div className="blog-card-tags">
          {post.frontmatter.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <span className="blog-card-read-more">
          Read article <ArrowRight size={14} />
        </span>
      </article>
    </Link>
  );
}
