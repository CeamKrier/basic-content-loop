import React, { useEffect, useState } from "react";

import FullCover from "components/FullCover";

import { IShowcase } from "./Showcase.interface";
import { sleep } from "utils/helpers";

const Showcase = ({ playlist }: IShowcase) => {
    const [contentIndex, setContentIndex] = useState(-1);

    const showNextContent = async () => {
        const currentContent = playlist?.[contentIndex];
        await sleep(currentContent?.duration);
        setContentIndex(contentIndex + 1 < playlist?.length! ? contentIndex + 1 : 0);
    };

    useEffect(() => {
        showNextContent();
    }, [contentIndex]);

    return (
        <>
            {playlist.map((ct, index) => (
                <>
                    <FullCover key={ct.url} contentType={ct?.type} contentURL={ct?.url} visible={index === contentIndex} />
                </>
            ))}
        </>
    );
};

export default Showcase;
