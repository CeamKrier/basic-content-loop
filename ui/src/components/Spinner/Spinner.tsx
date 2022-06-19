import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "styles/components/spinner.scss";

const Spinner = () => {
    return (
        <div className='spinner-wrapper'>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
            <h3>Loading...</h3>
        </div>
    );
};

export default Spinner;
