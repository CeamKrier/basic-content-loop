import React, { useLayoutEffect } from "react";

import { IFullCover } from "./FullCover.interface";

import "styles/components/full-cover.scss";

const FullCover = ({ contentURL, contentType, visible }: IFullCover) => {
    if (!contentURL || !contentType) {
        return <></>;
    }

    let content;

    if (contentType === "video") {
        content = (
            <div className='full-cover-video'>
                <video src={contentURL} autoPlay muted loop></video>
            </div>
        );
    } else if (contentType === "image") {
        content = <div className='full-cover-image' style={{ backgroundImage: `url(${contentURL})` }}></div>;
    }

    return <div className={`full-cover${!visible ? "-hidden" : ""}`}>{content}</div>;
};

export default FullCover;
