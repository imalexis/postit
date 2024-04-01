"use client";

import { Button, Flex } from "antd";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <Flex>
      <Button type="link" onClick={() => signIn()} style={styles.signIn}>
        Sign In
      </Button>
    </Flex>
  );
}

const styles = {
  signIn: {
    margin: "8px",
    fontWeight: "bold",
    fontSize: "20px",
    color: "#207178",
  },
};
