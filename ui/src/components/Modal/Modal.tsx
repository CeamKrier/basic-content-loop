import React from "react";
import { IModal } from "./Modal.interface";

import "styles/components/modal.scss";

const Modal = ({}: IModal) => {
    return (
        <div className='modal-wrapper'>
            <div></div>
        </div>
    );
};

export default Modal;
