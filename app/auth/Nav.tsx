import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Logged from "./Logged";
import { Button, Flex } from "antd";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  return (
    <Flex align="center" justify="space-evenly">
      <Flex>
        <Button type="primary" href="/">
          Sent it.
        </Button>
        <Button type="primary" href="/dashboard">
          Dashboard
        </Button>
      </Flex>
      <Flex>
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image || ""} />}
      </Flex>
    </Flex>
  );
}
