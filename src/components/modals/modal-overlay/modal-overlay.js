import React from 'react';
import modalOverlay from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    return(
        <div className={modalOverlay.container}>
            {props.children}
        </div>
    );
};

export default ModalOverlay;