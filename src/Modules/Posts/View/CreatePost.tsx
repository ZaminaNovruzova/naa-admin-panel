import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { postSchemaType } from "./EditPost";
import { useModal } from "../../../context/ModalWindowContext";
import { postSchema } from "../Models/PostsType";

const CreatePost = () => {
  const [pageIsOpened, setPageIsOpened] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<"AZ" | "EN">("AZ");
  const { closeModal } = useModal();

  const {
    register,
    formState: { errors },
  } = useForm<postSchema>({
    resolver: yupResolver(postSchemaType),
    defaultValues: {
      title: "",
      content: "",
      type: "news",
    },
  });

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
          {pageIsOpened === 1 && (
            <form
              className="pageFirst"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="userBox">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  {...register("title")}
                />
              </div>
              {errors.title && (
                <span className="error">{errors.title.message}</span>
              )}
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
                  <label className="category">
                    <input type="radio" {...register("type")} />
                    <span>News</span>
                  </label>
                  <label className="category active">
                    <input type="radio" {...register("type")} />
                    <span>Announcement</span>
                  </label>
                </div>
              </div>

              <div className="userBox">
                <label htmlFor="cover">Cover Image</label>
                <div className="uploadBox flex-col">
                  <input id="cover" type="file" className="hidden" />
                  <label htmlFor="cover" className="uploadText">
                    Upload Cover Image
                  </label>
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
              </div>
              {errors.content && (
                <span className="error">{errors.content.message}</span>
              )}

              <button
                className="nextButton"
                onClick={() => {
                  setPageIsOpened(2);
                }}
              >
                Next
              </button>
            </form>
          )}
          {pageIsOpened === 2 && (
            <form
              className="pageSecond"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="userBox">
                <div className="textBox">
                  <h4>Gallery Images</h4>
                  <p>JPG/PNG, multiple allowed</p>
                </div>
                <div className="uploadBox">
                  <input id="cover" type="file" className="hidden" />
                  <label htmlFor="cover" className="uploadText">
                    Upload an image
                  </label>
                </div>
              </div>

              <div className="buttons">
                <button className="cancelButton" onClick={closeModal}>
                  Cancel
                </button>
                <button className="submitButton">Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
