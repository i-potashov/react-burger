import React from 'react';
import modalOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    const modalOverlayRef = React.useRef(null);

    const handleClickOutside = (e) => {
        modalOverlayRef.current === e.target && props.handleCloseModal();
    };

    return (
        <div className={modalOverlay.container} ref={modalOverlayRef} onClick={handleClickOutside}>
            {props.children}
        </div>
    );
};

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func,
};

export default ModalOverlay;
