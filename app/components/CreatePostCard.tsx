"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { Badge, Button, Card, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function CreatePostCard() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostId: string;
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostId });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Post has been made 🔥", { id: toastPostId });
        queryClient.invalidateQueries([["posts"]]); // automatically refetch posts
        setTitle("");
        setIsDisabled(false);
        toast.remove(toastPostId);
        queryClient.setQueryData(["posts", {}], data);
      },
    }
  );
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostId = toast.loading("Creating your post", { id: toastPostId });
    setIsDisabled(true);
    mutate(title);
  };
  return (
    <Card title="What's on your mind?" style={{ width: "50%" }}>
      <Flex vertical gap={8}>
        <TextArea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          style={{ width: "100%" }}
        />
        <Flex align="center" justify="space-between">
          <Badge count={`${title.length}/300`} />
          <Button onClick={submitPost} disabled={isDisabled}>
            Create post
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
