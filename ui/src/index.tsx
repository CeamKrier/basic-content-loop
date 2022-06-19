import React from "react";
import ReactDOM from "react-dom/client";

const Main = React.lazy(() => import("pages/Main"));
import Spinner from "components/Spinner";

import "antd/dist/antd.css";
import "styles/global.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <React.Suspense fallback={<Spinner />}>
            <Main />
        </React.Suspense>
    </React.StrictMode>
);
