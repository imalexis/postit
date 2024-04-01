import { Comment } from "./Comment";

export type PostType = {
  id: string;
  title: string;
  updatedAt?: string;
  user: {
    name: string;
    image: string;
    id: string;
    email: string;
  };
  comments?: Comment[];
};
