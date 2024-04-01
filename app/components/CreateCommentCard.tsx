"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Card, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  id?: string;
};

type Comment = {
  postId: string;
  title: string;
};

export default function CreateCommentCard({ id }: Props) {
  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string;

  const { mutate } = useMutation(
    async (data: Comment) => {
      return axios.post("/api/posts/addComment", { data });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["detail-post"]);
        setComment("");
        setIsDisabled(false);
        toast.success("Added your comment", { id: commentToastId });
        toast.remove(commentToastId);
      },
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    commentToastId = toast.loading("Adding your comment", {
      id: commentToastId,
    });

    mutate({ title: comment, postId: id ?? "" });
  };

  return (
    <Card title="Create a comment" style={{ width: "50%" }}>
      <Flex vertical gap={8}>
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What's on your mind?"
          style={{ width: "100%" }}
        />
        <Flex align="center" justify="space-between">
          <Badge count={`${comment.length}/300`} />
          <Button onClick={submitComment} disabled={isDisabled}>
            Create comment
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
