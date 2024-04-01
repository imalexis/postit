"use client";

import { signOut } from "next-auth/react";
import { Avatar, Button, Flex } from "antd";

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  return (
    <Flex align="center">
      <Button type="link" onClick={() => signOut()} style={styles.signOut}>
        Sign Out
      </Button>
      <Avatar src={image} size={32} />
    </Flex>
  );
}

const styles = {
  signOut: {
    margin: "8px",
    fontWeight: "bold",
    fontSize: "20px",
    color: "#207178",
  },
};
