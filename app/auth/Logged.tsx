"use client";

import { signOut } from "next-auth/react";
import { Avatar, Button, Flex } from "antd";

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  return (
    <Flex>
      <Button
        onClick={() => signOut()}
        className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md"
      >
        Sign out
      </Button>
      <Avatar src={image} size={32} />
    </Flex>
  );
}
