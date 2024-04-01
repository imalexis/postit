"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Avatar, Button, Card, Flex, Modal } from "antd";
import { Comment } from "../types/Comment";
import { Typography } from "antd";
import { calculateTimeAgo } from "../components/CommentCard";

const { Text } = Typography;
type Props = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments: Comment[];
  createdAt: string;
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
  createdAt,
}: Props) {
  console.log("comments = ", comments);
  let deleteToastId: string;
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        toast.error("Error deleting that post.", { id: deleteToastId });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["auth-posts"]);
        toast.success("Post has been deleted.", { id: deleteToastId });
        toast.remove(deleteToastId);
      },
    }
  );
  const deletePost = () => {
    deleteToastId = toast.loading("Deleting your post.", { id: deleteToastId });
    mutate(id);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeAgo = calculateTimeAgo(createdAt);
  return (
    <Flex vertical justify="center" style={{ width: "100%" }} flex={1}>
      <Flex style={{ width: "100%" }}>
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
          style={{ width: "100%" }}
        >
          <p className="break-all">{title}</p>
          <Flex align="center" gap={20} justify="space-between">
            <Text style={{ color: "#207178" }}>
              {`${comments?.length ?? 0}`} Comments
            </Text>
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
              style={styles.deleteButton}
            >
              Delete
            </Button>
          </Flex>
        </Card>
      </Flex>

      <Flex>
        <Modal
          title="Confirm your delete"
          open={isModalOpen}
          onOk={() => {
            deletePost();
            setIsModalOpen(false);
          }}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        >
          <h3 className="text-red-600 text-sm">
            Pressing the delete button will permenantly delete your post
          </h3>
        </Modal>
      </Flex>
    </Flex>
  );
}

const styles = {
  deleteButton: {
    backgroundColor: "#207178",
    color: "white",
    fontWeight: "bold",
    border: "transparent",
    borderRadius: "15px",
  },
};
