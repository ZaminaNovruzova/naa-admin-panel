import { createContext, useContext, useState, ReactNode } from "react";
import { Post } from "../Modules/Posts/Models/PostsType";

interface ModalContextType {
  selectedPost: Post | null;
  modalIsOpened: boolean;
  overlayIsOpened: boolean;
  setSelectedPost: (value:Post) => void;
  openModal: (value:Post) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [overlayIsOpened, setOverlayIsOpened] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openModal = (post?: Post) => {
    if (post) setSelectedPost(post);
  
    setModalIsOpened(true);
    setOverlayIsOpened(true);
  };

  const closeModal = () => {
    setModalIsOpened(false);
    setOverlayIsOpened(false);
    setSelectedPost(null);
  };

  return (
    <ModalContext.Provider
      value={{
        selectedPost,
        setSelectedPost,
        modalIsOpened,
        overlayIsOpened,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};


export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
