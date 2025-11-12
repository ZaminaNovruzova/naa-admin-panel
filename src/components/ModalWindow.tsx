import { useState } from "react";

const ModalWindow = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1); 

  return (
    <section className="modalWindow fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="container">
        <div className="row">
          <div className="titleBox">
            <div className="languageAndCloseWindow">
              <div className="languageIcon"></div>
              <p className="close" onClick={setIsModalOpen(false)}>
                X
              </p>
            </div>
            <div className="title">
              <h2>Create News / Announcement</h2>
              <span>1/2</span>
            </div>
          </div>
          <form>
            <label htmlFor="">Title</label>
            <input type="text" placeholder="enter title" />
            <label htmlFor="">slug</label>
            <input type="url" value="naa.edu.az/" />
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

export default ModalWindow;
