import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, InputNumber, Select } from "antd";

import Modal from "components/Modal";
import Showcase from "components/Showcase";

import { IPlaylist } from "services/api.interface";
import apiClient from "services/api";

import "styles/pages/main.scss";

const Option = Select.Option;

function App() {
    const [playlist, setPlaylist] = useState<Array<IPlaylist>>();
    const [contentName, setContentName] = useState<string>();
    const [contentUrl, setContentUrl] = useState<string>();
    const [contentDisplayDuration, setContentDisplayDuration] = useState<number>();
    const [contentType, setContentType] = useState<string>();

    const getPlaylist = useCallback(async () => {
        const response = await apiClient.get("/playlist");
        if (response.status === 200) {
            setPlaylist(response.data);
        }
    }, []);

    useEffect(() => {
        getPlaylist();
    }, []);

    const onContentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContentName(event.target.value);
    };

    const onContentUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContentUrl(event.target.value);
    };

    const onContentTypeChange = (value: string) => {
        setContentType(value);
    };

    const onSubmit = async () => {
        const payload = { name: contentName, url: contentUrl, duration: contentDisplayDuration, type: contentType };

        const response = await apiClient.post("/add", payload);

        console.log("operation", response);
        if (response.status === 200) {
            setPlaylist(response.data);
        }
    };

    if (!playlist) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Showcase playlist={playlist} />
            <Modal>
                <div className='modal-row'>
                    <span className='title'>Content Name</span>
                    <Input placeholder='Enter name' onChange={onContentNameChange} />
                </div>
                <div className='modal-row'>
                    <span className='title'>Content Address</span>
                    <Input placeholder='Enter URL' onChange={onContentUrlChange} />
                </div>
                <div className='modal-row'>
                    <span className='title'>Content Type</span>
                    <Select placeholder='Select type' optionFilterProp='children' onChange={onContentTypeChange}>
                        <Option value='video'>Video</Option>
                        <Option value='image'>Image</Option>
                    </Select>
                </div>
                <div className='modal-row'>
                    <span className='title'>Display Duration</span>
                    <InputNumber placeholder='Enter duration (seconds)' min={1} onChange={setContentDisplayDuration} />
                </div>
                <div className='modal-row'>
                    <Button type='primary' onClick={onSubmit}>
                        Submit
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default App;
