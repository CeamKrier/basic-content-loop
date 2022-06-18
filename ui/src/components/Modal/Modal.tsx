import React, { useState } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

import { IModal } from "./Modal.interface";

import "styles/components/modal.scss";

const Modal = ({ children }: IModal) => {
    const [isOpen, setOpen] = useState(false);

    const onModalToggle = () => {
        setOpen(!isOpen);
    };

    return (
        <div className={`modal-wrapper ${!isOpen ? "closed" : ""}`}>
            <div className='modal-toggler' onClick={onModalToggle}>
                {isOpen ? <CloseOutlined /> : <MenuOutlined />}
            </div>
            <div className='modal'>{children}</div>
        </div>
    );
};

export default Modal;
