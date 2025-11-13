import type { Post, postSchema } from "../Models/PostsType";
import * as PostProvider from "../Provider/PostsProvider";

export class PostService {
  static readAllPosts = async (): Promise<Post[]> => {
    return await PostProvider.getAllPosts().then((response) => {
      return response.data.map((item: Post) => ({
        ...item,
        sharing_time: new Date(item.sharing_time).toLocaleString(),
      }));
    });
  };
  static readSinglePost = async (id: string): Promise<Post> => {
    return await PostProvider.getSinglePost(id).then((response) => {
      return response.data;
    });
  };
  static editPost = async (payload:postSchema,id:string)=> {
    return await PostProvider.putSinglePost(payload,id).then((response) => {
      console.log(response.data,"alasaks")

      return response.data;
    });
  };
}
