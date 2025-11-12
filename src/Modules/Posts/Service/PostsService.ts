import type { Post } from "../Models/PostsType";
import * as PostProvider from "../Provider/PostsProvider";

export class PostService {
  static readAllPosts = async (): Promise<Post[]> => {
    return await PostProvider.getAllPosts().then((response) => {
      return response.data;
    });
  };
  static readSinglePost = async (id:string) :Promise<Post>  => {
    return await PostProvider.getSinglePost(id).then((response) => {
      return response.data;
    });
  };
}
