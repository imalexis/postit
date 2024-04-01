"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Card, Flex, Modal } from "antd";
import { Comment } from "../types/Comment";

type Props = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments: Comment[];
};

export default function EditPost({ avatar, name, title, comments, id }: Props) {
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

  return (
    <>
      <Card
        title="Card title"
        bordered={false}
        style={{ width: 500 }}
        extra={
          <Flex align="center">
            <Image width={32} height={32} src={avatar} alt="avatar" />
            <h3 className="font-bold text-gray-700">{name}</h3>
          </Flex>
        }
      >
        <p className="break-all">{title}</p>
        <Flex align="center" gap={20}>
          <p className="text-sm font-bold text-gray-700">
            {`${comments?.length ?? 0}`} Comments
          </p>
          <Button
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Delete
          </Button>
        </Flex>
      </Card>
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
    </>
  );
}
