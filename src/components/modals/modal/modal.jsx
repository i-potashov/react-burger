import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function Modal(props) {
  const modalElement = document.getElementById('modal');

  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') props.onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    props.isOpen && (
      <ModalOverlay handleCloseModal={props.onClose}>
        <div className={modalStyles.wrap}>
          <div className={modalStyles.close} onClick={props.onClose}>
            <CloseIcon type="primary" />
          </div>
          {props.children}
        </div>
      </ModalOverlay>
    ),
    modalElement
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
