import axios from "axios";
import $api from "../../../api/endpoints";

export const getAllPosts = async () => {
  const url = `${import.meta.env.VITE_BASE_URL}/${$api("get_all_posts")}`;
  const response = await axios.get(url);
  return response;
};

export const getSinglePost = async (postId: string) => {
  const url = `${import.meta.env.VITE_BASE_URL}/${
    $api(`get_single_post`) + `/${postId}`
  }`;
  const response = await axios.get(url);
  return response;
};
