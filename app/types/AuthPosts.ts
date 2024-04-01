import { Comment } from "./Comment";

export type AuthPosts = {
  email: string;
  id: string;
  image: string;
  name: string;
  posts: {
    createdAt: string;
    id: string;
    title: string;
    comments: Comment[];
  }[];
};
