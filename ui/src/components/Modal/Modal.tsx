import React from "react";
import { IModal } from "./Modal.interface";

import "styles/components/modal.scss";

const Modal = ({ children }: IModal) => {
    return <div className='modal-wrapper'>{children}</div>;
};

export default Modal;
