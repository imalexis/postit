import type { Metadata } from "next";
import Nav from "./auth/Nav";
import QueryWrapper from "./auth/QueryWrapper";

export const metadata: Metadata = {
  title: "Postit",
  description: "Postit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: "#f7f7f7" }}>
      <head />
      <body>
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
