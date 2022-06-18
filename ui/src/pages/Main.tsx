import React, { useCallback, useEffect, useState } from "react";

import Modal from "components/Modal";
import Showcase from "components/Showcase";
import Input from "components/Input";

import { IPlaylist } from "services/api.interface";
import apiClient from "services/api";

import "styles/pages/main.scss";

function App() {
    const [playlist, setPlaylist] = useState<Array<IPlaylist>>();

    const getPlaylist = useCallback(async () => {
        const response = await apiClient.get("/playlist");
        if (response.status === 200) {
            setPlaylist(response.data);
        }
    }, []);

    useEffect(() => {
        getPlaylist();
    }, []);

    if (!playlist) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Showcase playlist={playlist} />
            <Modal>
                <Input />
            </Modal>
        </div>
    );
}

export default App;
