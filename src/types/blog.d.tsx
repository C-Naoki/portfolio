export type BlogPost = {
  id: string;
  last_edited_time: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
  thumbnail: string | null;
};
