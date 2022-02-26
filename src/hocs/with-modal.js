import React from 'react';
import withModalStyles from './with-modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const withModal = WrappedComponent=> props => {
    return (
        <div className={withModalStyles.wrap}>
            <div className={withModalStyles.close} onClick={()=>props.onClose()}>
                <CloseIcon type="primary" />
            </div>
            <WrappedComponent {...props}/>
        </div>
    )
};

export default withModal;