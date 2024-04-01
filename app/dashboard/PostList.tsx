"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPost";
import { Flex } from "antd";

const fetchAuthPosts = async () => {
  const response = await axios.get("api/posts/authPosts");
  return response.data;
};

export default function PostList() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });
  if (isLoading) {
    return <h1>Posts are loading</h1>;
  }
  return (
    <Flex vertical align="center">
      {data?.posts?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </Flex>
  );
}
