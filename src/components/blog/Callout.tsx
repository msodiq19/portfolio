import { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: ReactNode;
}

const icons: Record<string, string> = {
  info: "ℹ️",
  warning: "⚠️",
  tip: "💡",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <aside className={`blog-callout blog-callout-${type}`} role="note">
      <span className="blog-callout-icon">{icons[type]}</span>
      <div className="blog-callout-content">{children}</div>
    </aside>
  );
}
