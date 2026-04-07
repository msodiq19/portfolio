import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

interface BlogHeaderProps {
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
}

export function BlogHeader({ title, date, readingTime, tags }: BlogHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="blog-header">
      <Link href="/blog" className="blog-back-link">
        <ArrowLeft size={16} />
        Back to all posts
      </Link>

      <h1 className="blog-post-title">{title}</h1>

      <div className="blog-post-meta">
        <span className="blog-meta-item">
          <Calendar size={14} />
          {formattedDate}
        </span>
        <span className="blog-meta-divider">·</span>
        <span className="blog-meta-item">
          <Clock size={14} />
          {readingTime}
        </span>
      </div>

      <div className="blog-post-tags">
        {tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </header>
  );
}
