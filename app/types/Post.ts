import { Comment } from "./Comment";

export type Post = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  user: {
    name: string;
    image: string;
    id: string;
    email: string;
  };
  comments?: Comment[];
};
