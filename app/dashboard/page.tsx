import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PostList from "./PostList";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <Flex style={{ width: "50%", margin: "0 auto" }} vertical align="center">
      <Title style={{ color: "#F58653" }}>
        Welcome back {session?.user?.name}
      </Title>
      <PostList />
    </Flex>
  );
}
