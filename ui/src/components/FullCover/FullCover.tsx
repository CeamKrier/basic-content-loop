import React from "react";

import { IFullCover } from "./FullCover.interface";

import "styles/components/full-cover.scss";

const FullCover = ({ contentURL, contentType }: IFullCover) => {
    if (!contentURL || !contentType) {
        return <></>;
    }

    if (contentType === "video") {
        return (
            <div className='full-cover-video'>
                <video src={contentURL} autoPlay muted loop></video>
            </div>
        );
    }
    return <div className='full-cover-image' style={{ backgroundImage: `url(${contentURL})` }}></div>;
};

export default FullCover;
