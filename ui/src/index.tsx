import React from "react";
import ReactDOM from "react-dom/client";

import Main from "pages/Main";
import "antd/dist/antd.css";
import "styles/global.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);
