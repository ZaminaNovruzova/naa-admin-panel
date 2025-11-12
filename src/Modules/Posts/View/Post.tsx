import { PostService } from "../Service/PostsService";
import type { Post } from "../Models/PostsType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ModalWindow from "../../../components/ModalWindow";
import { Link } from "react-router-dom";

const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: PostService.readAllPosts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }

  return (
    <section className="newsAndAnnouncements ">
      <div className="container">
        <div className=" row">
          <div className="titleAndButtonBox">
            <div className="title">
              <h2>
                News & Announcements
              </h2>
              <span className="quantity"> burda xeber sayi olacaq</span>
            </div>
            <div
              className="button"
              
                          >
              <span>+</span>
              <span>Add News and Announcements</span>
            </div>
          </div>
          <table className="">
            <thead className="">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Image</th>
                <th>Type</th>
                <th>Sharing Time</th>
                <th>Status</th>
                <th>Publish Status</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>
                    <img src={post.image_url} alt={post.title} width={50} />
                  </td>
                  <td>{post.type}</td>
                  <td>{new Date(post.sharing_time).toLocaleString()}</td>
                  <td>{post.status}</td>
                  <td>{post.publish_status}</td>
                  <td>{post.author}</td>
                  <td>
                    <Link
                      to={`/edit-post/${post.id}`}
                      className="edit hover:text-red-500 cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      edit
                    </Link>
                    <div
                      className="delete hover:text-red-500 cursor-pointer"
                      onClick={() => {}}
                    >
                      delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <ModalWindow />}
    </section>
  );
};

export default Post;
