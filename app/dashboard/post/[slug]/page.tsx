"use client";

import { Post } from "@/app/types/Post";
import PostCard from "@/app/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreateCommentCard from "@/app/components/CreateCommentCard";
import { Flex } from "antd";
import CommentCard from "@/app/components/CommentCard";

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail({ params }: { params: { slug: string } }) {
  const { data, isLoading } = useQuery<Post>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(params.slug),
  });
  if (isLoading) return "Loading";
  if (!data) {
    return "No data found.";
  }
  return (
    <Flex vertical align="center" gap={48}>
      <PostCard
        id={data.id || ""}
        name={data.user?.name || ""}
        avatar={data.user?.image || ""}
        postTitle={data.title || ""}
        comments={data.comments || []}
        showCommentNumber={false}
        createdAt={data.createdAt}
      />
      <CreateCommentCard id={data.id || ""} />
      {data?.comments?.map((comment, index) => (
        <CommentCard comment={comment} key={index} />
      ))}
    </Flex>
  );
}
