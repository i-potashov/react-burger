import React from 'react';
import ReactDOM from 'react-dom';
import modalOverlay from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = (props) => {

    const modalOverlayRef = React.useRef(null);

    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) props.onClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleClickOutside = (e) => {
        if (modalOverlayRef.current === e.target) {
            props.onClose();
        }
    }


    return ReactDOM.createPortal(
        props.isOpen &&
        <div className={modalOverlay.container} ref={modalOverlayRef} onClick={(e) => handleClickOutside(e)}>
            {props.children}
        </div>,
        document.body
    );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
    onClick: PropTypes.func,
    isOpen: PropTypes.bool
}