import { getLatestPosts } from "@/lib/blog";
import HomeClient from "./HomeClient";

export default function Home() {
  const latestPosts = getLatestPosts(3);
  return <HomeClient latestPosts={latestPosts} />;
}
