import { useParams } from "react-router-dom";
import { Post } from "../Models/PostsType";
import { PostService } from "../Service/PostsService";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { string, object } from "yup";

const postSchema = object({
  title: string().trim().required(),
  content: string().trim().required(),
  image_url: string().trim().required(),
  type: string().oneOf(["news", "announcement"]).required(),
  sharing_time: string().trim().required(),
  status: string().oneOf(["active", "inactive"]).required(),
  publish_status: string().trim().required(),
  author: string().trim().required(),
});

const EditPost = () => {
  const { postId } = useParams();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const { data, isLoading, isError } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => PostService.readSinglePost(postId || ""),
    enabled: !!postId,
  });

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Xəta baş verdi</p>;

  const { register } = useForm({
    resolver: yupResolver(postSchema),
  });
  
  return (
    <section className="editPost rounded-3xl bg-amber-400 fixed flex justify-center items-center z-100">
      <div className="container">
        <div className="row flex-col p-4">
          <div className="titleBox flex-col">
            <div className="languageAndCloseWindow flex justify-between">
              <div className="languageIcon"></div>
              <p className="close">X</p>
            </div>
            <div className="title">
              <h2>Create News / Announcement</h2>
              <span>1/2</span>
            </div>
          </div>
          <form>
            <label>Title</label>
            <input type="text" placeholder="enter title" {...register("title")} />
            <label >slug</label>
            <input type="url" value="naa.edu.az/" readOnly/>
            <label htmlFor="">Category</label>
            <input type="radio" value="News" />
            <input type="radio" value="Announcement" />
            <label htmlFor="">Cover Image</label>
            <input type="file" placeholder="upload cover image" />
            <div className="textareaBox">
              <label htmlFor="">Html content</label>
              <p>
                Use the toolbar to format your text with bold, italic, headers,
                lists, and more.
              </p>
              {/* bu hissede bold italic iconlari olacaq  */}
              <textarea name="" id=""></textarea>
            </div>
            {/* nexte basanda formun 2ci sehifesine aparacaq ve ikinci sehifede sekil yukelem olacaq  */}
            <button>Next</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPost;
