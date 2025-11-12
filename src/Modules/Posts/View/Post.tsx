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
        <div className=" row flex-col gap-4">
          <div className="titleAndButtonBox flex justify-between items-center">
            <div className="title">
              <h2 className="text-nowrap font-medium text-2xl">
                News & Announcements
              </h2>
              <span className="quantity"> burda xeber sayi olacaq</span>
            </div>
            <div
              className="button bg-blue-950 text-white rounded-4xl p-3 cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <span>+</span>
              <span>Add News and Announcements</span>
            </div>
          </div>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Content</th>
                <th className="px-4 py-2 border-b">Image</th>
                <th className="px-4 py-2 border-b">Type</th>
                <th className="px-4 py-2 border-b">Sharing Time</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Publish Status</th>
                <th className="px-4 py-2 border-b">Author</th>
                <th className="px-4 py-2 border-b">Action</th>
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
