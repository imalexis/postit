"use client";

import { Avatar, Badge, Card, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Comment } from "../types/Comment";
import { Typography } from "antd";
import { verify } from "crypto";

const { Text, Paragraph } = Typography;
type Props = {
  comment: Comment;
};

export const calculateTimeAgo = (date: string) => {
  const currentDate = new Date();
  const providedDate = new Date(date);

  // Calculate the difference in milliseconds
  const difference: number = currentDate.getTime() - providedDate.getTime();

  // Convert milliseconds to days
  const days: number = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days > 365) {
    // More than one year ago
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (days > 30) {
    // More than one month ago
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    // Less than one month ago
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};
export default function CommentCard({ comment }: Props) {
  const timeAgo = calculateTimeAgo(comment.createdAt ?? "");
  return (
    <Card style={{ width: "50%" }}>
      <Flex vertical gap={12}>
        <Flex align="center" gap={6}>
          <Avatar size={32} src={comment.user.image} />
          <Text>{comment.user.name}</Text>
          <span
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "1.5px",
              backgroundColor: "#808080",
            }}
          >
            {" "}
          </span>
          <Text style={{ color: "#808080" }}>{timeAgo}</Text>
        </Flex>
        <Paragraph style={{ width: "100%" }}>{comment.message}</Paragraph>
      </Flex>
    </Card>
  );
}
