"use client";
import { Avatar, Button, Card, Flex } from "antd";
import { Comment } from "../types/Comment";
import TextArea from "antd/es/input/TextArea";

type Props = {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  comments: Comment[];
  showCommentNumber?: boolean;
};

export default function PostCard({
  avatar,
  name,
  postTitle,
  comments,
  id,
  showCommentNumber,
}: Props) {
  return (
    <Card
      title={id}
      extra={
        <Flex align="center" gap={12}>
          <Avatar size={32} src={avatar} />
          <span>{name}</span>
        </Flex>
      }
      style={{ width: "50%" }}
    >
      <TextArea value={postTitle} disabled={true} />
      {(showCommentNumber ?? true) && (
        <Button href={`dashboard/post/${id}`}>
          {comments.length} Comments
        </Button>
      )}
    </Card>
  );
}
