"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Typography } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";

const { Text } = Typography;
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
    <Flex vertical style={{ width: "50%" }} gap={12}>
      <Flex justify="center">
        <Text
          style={{ color: "#F58653", fontWeight: "bold", fontSize: "18px" }}
        >
          Add a comment ? <CoffeeOutlined />
        </Text>
      </Flex>

      <Flex flex={1} style={{ width: "100%" }}>
        <Card style={{ width: "100%" }}>
          <Flex vertical gap={8}>
            <TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What's on your mind?"
              style={{ width: "100%" }}
            />
            <Flex align="center" justify="space-between">
              <Text style={{ color: "#999999" }}>
                {`${comment.length}/300`}
              </Text>

              <Button
                onClick={submitComment}
                disabled={isDisabled}
                style={styles.createCommentButton}
              >
                Add a comment
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}

const styles = {
  createCommentButton: {
    backgroundColor: "#F58653",
    color: "white",
    fontWeight: "bold",
    border: "transparent",
    borderRadius: "15px",
  },
};
