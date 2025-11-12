export interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  type: "news" | "announcement"; 
  sharing_time: string; 
  status: "active" | "inactive";
  publish_status: string; 
  author: string;
  url: string;
}


