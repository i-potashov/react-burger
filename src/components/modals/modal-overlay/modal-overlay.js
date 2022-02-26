import React from 'react';
import ReactDOM from 'react-dom';
import modalOverlay from './modal-overlay.module.css';

const PortalModal = (props) => {

    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) props.onClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return ReactDOM.createPortal(
        props.isOpen &&
        <div className={modalOverlay.container}>
            {props.children}
        </div>,
        document.body
    );
};

export default PortalModal;