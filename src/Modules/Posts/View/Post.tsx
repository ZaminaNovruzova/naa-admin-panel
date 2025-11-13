import { PostService } from "../Service/PostsService";
import type { Post } from "../Models/PostsType";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CreatePost from "./CreatePost";
import { useModal } from "../../../context/ModalWindowContext";
import EditPost from "./EditPost";

const Post = () => {
  const [selectedCategory, setSelectedCategory] = useState("all posts");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchItem, setSearchItem] = useState("");
  const { modalIsOpened, openModal, closeModal, selectedPost } = useModal();

  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: PostService.readAllPosts,
  });

  //*her filterde basdan render olunmamasi ucun
  const filteredPosts = useMemo(() => {
    return data?.filter((item) => {
      const findedPosts = data?.filter((item) =>
        item.title.toLowerCase().includes(searchItem.trim().toLowerCase())
      );
      const filteredCategories =
        selectedCategory === "all posts" ||
        item.type.toLowerCase() === selectedCategory.toLowerCase();

      const filteredStatus =
        selectedStatus === "all" ||
        item.status.toLowerCase() === selectedStatus.toLowerCase();
      return findedPosts && filteredCategories && filteredStatus;
    });
  }, [data, selectedCategory, selectedStatus, searchItem]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }

  return (
    <section className="newsAndAnnouncements ">
      <div className="overlay" onClick={closeModal}></div>
      {modalIsOpened && (
        <div className="isOpened">
          <CreatePost />
        </div>
      )}
      {modalIsOpened && selectedPost && (
        <div className="isOpened">
          <EditPost />
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="titleAndButtonBox">
            <div className="title">
              <h2>News & Announcements</h2>
              {data?.length ? (
                <p className="quantity">{data.length} Posts</p>
              ) : (
                <p className="empty">Bu hisse bosdur!</p>
              )}
            </div>

            <div
              className="openModalButton"
              onClick={() => {
                openModal(selectedPost!);
              }}
            >
              <p className="add">+</p>
              <p>Add News and Announcements</p>
            </div>
          </div>
          <div className="dropDownMenus">
            <div className="categoryFilter">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                <option value="all posts">All posts</option>
                <option value="news">News</option>
                <option value="announcement">Announcements</option>
              </select>
            </div>
            <div className="statusFilter">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="search outline-1">
              <input
                onChange={(e) => {
                  setSearchItem(e.target.value);
                }}
                type="text"
                placeholder="search"
                value={searchItem}
              />
              <button
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <FaSearch />
              </button>
            </div>
          </div>
          <div className="newsBox">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Type</th>
                  <th>Sharing Time</th>
                  <th>Status</th>
                  <th>Publish Status</th>
                  <th>Author</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts?.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td className="tableImage">
                      <img src={post.image_url} alt={post.title} width={50} />
                    </td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>{post.type}</td>
                    <td>{post.sharing_time}</td>
                    <td>{post.status}</td>
                    <td>{post.publish_status}</td>
                    <td>{post.author}</td>
                    <td>
                      <p
                        className="edit hover:text-red-500 cursor-pointer"
                        onClick={() => openModal(post)}
                      >
                        edit
                      </p>

                      <p className="edit hover:text-red-500 cursor-pointer">
                        delete
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="page"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
