import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Logged from "./Logged";
import { Button, Flex } from "antd";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  return (
    <Flex align="center" justify="space-around" style={{ margin: "40px" }}>
      <Flex>
        <Button type="link" href="/" style={styles.button}>
          Sent it.
        </Button>
        <Button type="link" href="/dashboard" style={styles.button}>
          Dashboard
        </Button>
      </Flex>
      <Flex gap={6} align="center">
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image || ""} />}
      </Flex>
    </Flex>
  );
}
const styles = {
  button: {
    margin: "8px",
    fontWeight: "bold",
    color: "#207178",
    fontSize: "20px",
  },
};
