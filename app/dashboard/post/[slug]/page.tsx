"use client";

import { PostType } from "@/app/types/Post";
import PostCard from "@/app/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddComment from "@/app/components/CreateCommentCard";
import { Avatar, Badge, Card, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail({ params }: { params: { slug: string } }) {
  const { data, isLoading } = useQuery<PostType>({
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
      />
      <AddComment id={data.id || ""} />
      {data?.comments?.map((comment, index) => (
        <Card title={comment.id} style={{ width: "50%" }} key={index}>
          <Flex vertical gap={8}>
            <Flex align="center">
              <Avatar size={32} src={comment.user.image} />
              <Badge className="text-sm">{comment.createdAt}</Badge>
            </Flex>
            <TextArea
              value={comment.message}
              disabled={true}
              style={{ width: "100%" }}
            />
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
