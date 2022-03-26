/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useRef } from "react";
import modalOverlay from "./modal-overlay.module.css";

interface IModalOverlayProps {
  handleCloseModal: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ handleCloseModal, children }) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    if (modalOverlayRef.current === e.target) handleCloseModal();
  };

  return (
    <div className={modalOverlay.container} ref={modalOverlayRef} onMouseDown={handleClickOutside}>
      {children}
    </div>
  );
};

export default ModalOverlay;
