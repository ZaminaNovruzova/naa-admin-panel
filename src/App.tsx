import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Post from "./Modules/Posts/View/Post";
import { ModalProvider } from "./context/ModalWindowContext";
import PutPost from "./Modules/Posts/View/EditPost";

const App = () => {
  return (
    <ModalProvider>
      <div className="flex gap-8">
        <Header />
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/" element={<PutPost />} />
        </Routes>
      </div>
    </ModalProvider>
  );
};

export default App;
