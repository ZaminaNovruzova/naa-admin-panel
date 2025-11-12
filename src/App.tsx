import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Post from "./Modules/Posts/View/Post";
import EditPost from "./Modules/Posts/View/EditPost";

const App = () => {
  return (
    <>
      <div className="flex gap-8">
        <Header />
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
       
        </Routes>
      </div>
    </>
  );
};

export default App;
