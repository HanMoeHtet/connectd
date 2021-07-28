import { Modal } from '@material-ui/core';
import { createContext, useContext, useState } from 'react';

interface ModalContextType {
  content: React.ReactElement | null;
  setContent: (content: React.ReactElement | null) => void;
}

const initialValue = {
  content: null,
  setContent: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialValue);

export const AppModalProvider: React.FC = ({ children }) => {
  const [content, setContent] = useState<React.ReactElement | null>(null);

  return (
    <>
      <ModalContext.Provider value={{ content, setContent }}>
        {children}
        <AppModal />
      </ModalContext.Provider>
    </>
  );
};

export const AppModal: React.FC = () => {
  const { content, setContent } = useContext(ModalContext);

  const handleClose = () => {
    setContent(null);
  };

  return (
    <Modal
      open={Boolean(content)}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {content ? content : <></>}
    </Modal>
  );
};
