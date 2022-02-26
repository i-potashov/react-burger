import React from 'react';
import modalStyles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const Modal = props => {
    return (
        <div className={modalStyles.wrap}>
            <div className={modalStyles.close} onClick={()=>props.onClose()}>
                <CloseIcon type="primary" />
            </div>
            {props.children}
        </div>
    )
};

export default Modal;

Modal.propTypes = {
    onClick: PropTypes.func
}