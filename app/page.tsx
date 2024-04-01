"use client";
import axios from "axios";
import CreatePostCard from "./components/CreatePostCard";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./components/PostCard";
import { Post } from "./types/Post";
import { Flex } from "antd";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPost");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) {
    return <div>Error happend</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const posts = data?.map((post) => (
    <PostCard
      comments={post.comments ?? []}
      key={post.id}
      name={post.user.name}
      avatar={post.user.image}
      postTitle={post.title}
      id={post.id}
      createdAt={post.createdAt}
    />
  ));
  return (
    <Flex vertical align="center" gap={48} flex={1}>
      <CreatePostCard />
      {posts}
    </Flex>
  );
}
