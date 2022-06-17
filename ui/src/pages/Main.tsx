import React, { useState, useEffect, useCallback } from "react";

import FullCover from "components/FullCover";
import Modal from "components/Modal";

import "styles/pages/main.scss";
import apiClient from "services/api";
import { sleep } from "utils/helpers";

interface IPlaylist {
    name: string;
    url: string;
    duration: number;
    type: "image" | "video";
}

function App() {
    const [contentIndex, setContentIndex] = useState(-1);
    const [playlist, setPlaylist] = useState<Array<IPlaylist>>();

    const content = playlist?.[contentIndex];

    const showNextContent = async () => {
        const currentContent = playlist?.[contentIndex];
        await sleep(currentContent?.duration);
        setContentIndex(contentIndex + 1 < playlist?.length! ? contentIndex + 1 : 0);
    };

    const getPlaylist = useCallback(async () => {
        const response = await apiClient.get("/playlist");
        if (response.status === 200) {
            setPlaylist(response.data);
            setContentIndex(0);
        }
    }, []);

    useEffect(() => {
        showNextContent();
    }, [contentIndex]);

    useEffect(() => {
        getPlaylist();
    }, []);

    if (!playlist) {
        return <div>Loading..</div>;
    }

    return (
        <div>
            <FullCover contentType={content?.type} contentURL={content?.url} />
            {/* <Modal>
                <input></input>
            </Modal> */}
        </div>
    );
}

export default App;
