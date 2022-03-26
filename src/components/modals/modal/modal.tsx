import { FC, ReactPortal, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<IModal> = ({ isOpen, onClose, children }): ReactPortal => {
  const modalElement = document.getElementById("modal");

  if (!modalElement) {
    throw new Error("The element #modalElement for portal wasn't found");
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    isOpen && (
      <ModalOverlay handleCloseModal={onClose}>
        <div className={styles.wrap}>
          <div className={styles.close} onClick={onClose} aria-hidden="true">
            <CloseIcon type="primary" />
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalElement,
  );
};

export default Modal;
