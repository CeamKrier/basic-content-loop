import React, { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { INotification } from "./Notification.interface";
import "styles/components/notification.scss";

const Notification = ({ status, message }: INotification) => {
    const isSucceeded = status === 200;
    const notificationMessage = isSucceeded ? "Content successfully added" : message;

    const [isVisible, setVisibility] = useState<boolean>(false);

    useEffect(() => {
        if (status && message) {
            setVisibility(true);
        } else {
            setVisibility(false);
        }
    }, [status, message]);

    if (!isVisible) {
        return <></>;
    }

    return (
        <div className={`notification`}>
            {isSucceeded ? <CheckCircleOutlined className='icon icon-success' /> : <CloseCircleOutlined className='icon icon-error' />}

            {notificationMessage}
        </div>
    );
};

export default Notification;
