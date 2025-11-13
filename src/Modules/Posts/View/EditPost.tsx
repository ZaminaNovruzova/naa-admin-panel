import { ChangeEvent, useState } from "react";
import { useModal } from "../../../context/ModalWindowContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { PostService } from "../Service/PostsService";
import { postSchema } from "../Models/PostsType";

export const postSchemaType = object({
  title: string().trim().required("Bu hisse bos ola bilmez!!!"),
  content: string().trim().required("Bu hisse bos ola bilmez!!!"),
});

const EditPost = () => {
  const [pageIsOpened, setPageIsOpened] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<"AZ" | "EN">("AZ");
  const { selectedPost, closeModal } = useModal();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(selectedPost?.image_url || "");
  const [selectedCategory, setSelectedCategory] = useState(selectedPost?.type);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return "file tapilmadi";
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<postSchema>({
    resolver: yupResolver(postSchemaType),
    defaultValues: {
      title: selectedPost?.title,
      content: selectedPost?.content,
      type: selectedPost?.type || "news",
    },
  });

  const onSubmit: SubmitHandler<postSchema> = async () => {
    try {
      if (!selectedPost) {
        console.log("data tapilmadi");
      }
      const formData = new FormData();
      formData.append("title", selectedPost?.title ?? "");
      formData.append("content", selectedPost?.content ?? "");
      formData.append("type", selectedCategory ?? "");
      if (image) {
        formData.append("image_url", image);

        // @ts-ignore
        const result = await PostService.editPost(formData, selectedPost?.id);
        console.log(result, "Post edited successfully");
      }
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="editModalWindow">
      <div className="container">
        <div className="row">
          <div className="titleBox">
            <div className="languageAndCloseButton">
              <div className="languageBox">
                <button
                  className={`language ${
                    selectedLanguage === "AZ" ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedLanguage("AZ");
                  }}
                >
                  AZ
                </button>
                <button
                  className={`language ${
                    selectedLanguage === "EN" ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedLanguage("EN");
                  }}
                >
                  EN
                </button>
              </div>
              <div className="closeButton" onClick={closeModal}>
                X
              </div>
            </div>
            <div className="titleAndPageBox">
              <h2 className="title">Create News / Announcement</h2>
              <p className="page">{pageIsOpened}/2</p>
            </div>
            <div className="pagination">
              <div
                className={`pageLine ${
                  pageIsOpened === 1 ? "pageIsOpened" : ""
                }`}
                onClick={() => setPageIsOpened(1)}
              ></div>
              <div
                className={`pageLine ${
                  pageIsOpened === 2 ? "pageIsOpened" : ""
                }`}
                onClick={() => setPageIsOpened(2)}
              ></div>
            </div>
          </div>
          <form
            className={pageIsOpened === 1 ? "pageFirst" : "pageSecond"}
            onSubmit={handleSubmit(onSubmit)}
          >
            {pageIsOpened === 1 && (
              <div className="pageFirst">
                <div className="userBox">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter title"
                    {...register("title")}
                  />
                  {errors.title && (
                    <span className="error">{errors.title.message}</span>
                  )}
                </div>
                <div className="userBox">
                  <label htmlFor="slug">Slug</label>
                  <input
                    id="slug"
                    type="url"
                    placeholder="naa.edu.az/"
                    readOnly
                  />
                </div>
                <div className="userBox">
                  <label>Category</label>
                  <div className="categories">
                    <label
                      htmlFor="news"
                      className={`category ${
                        selectedCategory === "news" ? "active" : ""
                      }`}
                    >
                      <input
                        id="news"
                        type="radio"
                        {...register("type")}
                        onChange={() => setSelectedCategory("news")}
                      />
                      <span>News</span>
                    </label>
                    <label
                      htmlFor="announcement"
                      className={`category ${
                        selectedCategory === "announcement" ? "active" : ""
                      }`}
                    >
                      <input
                        id="announcement"
                        type="radio"
                        {...register("type")}
                        onChange={() => {
                          setSelectedCategory("announcement");
                        }}
                      />
                      <span>Announcement</span>
                    </label>
                  </div>
                </div>

                <div className="userBox">
                  <label htmlFor="cover">Cover Image</label>
                  <div className="uploadBox flex-col">
                    <input
                      id="cover"
                      type="file"
                      onChange={handleSelectImage}
                    />

                    {preview && (
                      <img
                        src={preview}
                        alt="preview"
                        className="previewImage"
                      />
                    )}
                  </div>
                </div>

                <div className="textareaBox">
                  <h4>Html content</h4>
                  <p>
                    Use the toolbar to format your text with bold, italic,
                    headers, lists, and more.
                  </p>
                  <div className="textBox">
                    <textarea
                      rows={5}
                      cols={50}
                      {...register("content")}
                    ></textarea>
                  </div>
                  {errors.content && (
                    <span className="error">{errors.content.message}</span>
                  )}
                </div>

                <p
                  className="nextButton text-center"
                  onClick={() => {
                    setPageIsOpened(2);
                  }}
                >
                  Next
                </p>
              </div>
            )}

            {pageIsOpened === 2 && (
              <div className="pageSecond">
                <div className="userBox">
                  <div className="textBox">
                    <h4>Gallery Images</h4>
                    <p>JPG/PNG, multiple allowed</p>
                  </div>
                  <div className="uploadBox">
                    <input
                      id="cover"
                      type="file"
                      onChange={handleSelectImage}
                    />
                  </div>
                  <div className="preview">
                    <img src={preview} alt="previewImage" />
                  </div>
                </div>
                <div className="buttons">
                  <button className="cancelButton" onClick={closeModal}>
                    Cancel
                  </button>
                  <button className="submitButton">Submit</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPost;
