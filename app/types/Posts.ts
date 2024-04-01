import { Comment } from "./Comment";

type PostType = {
  title: string;
  id: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  comments: Comment[];
};
export default PostType;
