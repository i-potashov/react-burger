import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Modal = props => {
    const modalRef = React.useRef(null);
    const modalElement = document.getElementById('modal');

    const handleClickOutside = (e) => (modalRef.current === e.target) && props.onClose();

    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') props.onClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return ReactDOM.createPortal(
        props.isOpen &&
        <ModalOverlay>
            <div className={modalStyles.container} ref={modalRef} onClick={handleClickOutside}>
                <div className={modalStyles.wrap}>
                    <div className={modalStyles.close} onClick={props.onClose}>
                        <CloseIcon type="primary"/>
                    </div>
                    {props.children}
                </div>
            </div>
        </ModalOverlay>,
        modalElement
    )
};

Modal.propTypes = {
    onClick: PropTypes.func,
    isOpen: PropTypes.bool
}

export default Modal;