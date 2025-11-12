import { useState } from "react";
import { useForm } from "react-hook-form";

export interface ModalProps {
  setModalIsOpened: (value: boolean) => void;
  setOverlayIsOpened: (value: boolean) => void;
}

const FormModalWindow = ({
  setModalIsOpened,
  setOverlayIsOpened,
}: ModalProps) => {
  const [pageIsOpened, setPageIsOpened] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<"AZ" | "EN">("AZ");
  const { register, handleSubmit } = useForm({

  });
  
  return (
    <section className="createAndEditModalWindow">
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
              <div
                className="closeButton"
                onClick={() => {
                  setModalIsOpened(false);
                  setOverlayIsOpened(false);
                }}
              >
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
                <input id="title" type="text" placeholder="Enter title" />
              </div>
              <div className="userBox">
                <label htmlFor="slug">Slug</label>
                <input
                  id="slug"
                  type="url"
                  placeholder="naa.edu.az/"
                  disabled
                />
              </div>
              <div className="userBox">
                <label>Category</label>
                <div className="categories">
                  <label className="category">
                    <input type="radio" name="category" value="News" />
                    <span>News</span>
                  </label>
                  <label className="category active">
                    <input type="radio" name="category" value="Announcement" />
                    <span>Announcement</span>
                  </label>
                </div>
              </div>

              <div className="userBox">
                <label htmlFor="cover">Cover Image</label>
                <div className="uploadBox">
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
                  <div className="toolbar">
                    <button type="button">
                      <b>B</b>
                    </button>
                    <button type="button">
                      <i>I</i>
                    </button>
                    <button type="button">H1</button>
                    <button type="button">H2</button>
                    <button type="button">•</button>
                    <button type="button">1.</button>
                  </div>
                  <textarea rows="5" cols="50"></textarea>
                </div>
              </div>
              <button
                type="submit"
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
                <button
                  className="cancelButton"
                  onClick={() => {
                    setModalIsOpened(false);
                    setOverlayIsOpened(false);
                  }}
                >
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

export default FormModalWindow;
