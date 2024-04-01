"use client";
import { Avatar, Button, Card, Flex } from "antd";
import { Comment } from "../types/Comment";
import TextArea from "antd/es/input/TextArea";
import { Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { calculateTimeAgo } from "./CommentCard";

const { Text } = Typography;
type Props = {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  comments: Comment[];
  showCommentNumber?: boolean;
  createdAt: string;
};

export default function PostCard({
  avatar,
  name,
  postTitle,
  comments,
  id,
  showCommentNumber,
  createdAt,
}: Props) {
  const timeAgo = calculateTimeAgo(createdAt);
  return (
    <Card
      title={
        <Flex align="center" gap={5}>
          <Avatar size={32} src={avatar} />
          <Text>{name}</Text>
        </Flex>
      }
      extra={
        <Flex align="center" gap={12}>
          <Text style={{ color: "#808080" }}>{timeAgo}</Text>
        </Flex>
      }
      style={{ width: "50%" }}
    >
      <Flex vertical gap={12}>
        <Paragraph>{postTitle}</Paragraph>
        <Flex>
          {(showCommentNumber ?? true) && (
            <Button href={`dashboard/post/${id}`}>
              {comments.length} Comments
            </Button>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
