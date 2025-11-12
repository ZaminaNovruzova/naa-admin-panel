const AddPost = () => {
  return (
    <section className="addNewPost">
      <div className="container">
        <div className="row">
          <div className="titleBox">
            <div className="languageAndCloseButton">
              <div className="languageBox"></div>
              <div className="closeButton">X</div>
            </div>
            <h2 className="title">Create News / Announcement</h2>
          </div>
          <form>
            <label>Title</label>
            <input type="text" placeholder="enter title" />
            <label>slug</label>
            <input type="url" value="naa.edu.az/" readOnly />
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

export default AddPost;
