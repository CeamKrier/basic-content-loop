import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, InputNumber, Select } from "antd";
import { AxiosResponse } from "axios";

import Modal from "components/Modal";
import Showcase from "components/Showcase";
import Notification from "components/Notification";

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
    const [operationResponse, setOperationResponse] = useState<AxiosResponse<any, any>>();
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);

    const getPlaylist = useCallback(async () => {
        const response = await apiClient.get("/playlist");
        if (response.status === 200) {
            setPlaylist(response.data);
        }
    }, []);

    useEffect(() => {
        getPlaylist();
    }, []);

    useEffect(() => {
        if (contentName && contentUrl && contentDisplayDuration && contentType) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    }, [contentName, contentUrl, contentDisplayDuration, contentType]);

    useEffect(() => {
        // clear operation response
        setTimeout(() => {
            setOperationResponse(undefined);
        }, 4000);
    }, [operationResponse]);

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

        try {
            const response = await apiClient.post("/add", payload);

            if (response.status === 200) {
                setPlaylist(response.data);
                setOperationResponse(response);
            }
        } catch (error: any) {
            setOperationResponse(error?.response as AxiosResponse);
        }
    };

    if (!playlist) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Showcase playlist={playlist} />
            <Modal>
                <h3 className='modal-title'>Add Content</h3>
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
                    <Button type='primary' onClick={onSubmit} disabled={isSubmitDisabled}>
                        Submit
                    </Button>
                </div>
            </Modal>
            <Notification status={operationResponse?.status} message={operationResponse?.data} />
        </div>
    );
}

export default App;
