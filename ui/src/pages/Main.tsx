import React, { useMemo, useEffect, useState, useReducer } from "react";
import { Button, Input, InputNumber, Select } from "antd";
import { AxiosResponse } from "axios";

import Modal from "components/Modal";
import Showcase from "components/Showcase";
import Notification from "components/Notification";
import Spinner from "components/Spinner";

import { IPlaylist } from "services/api.interface";
import apiClient from "services/api";

import "styles/pages/main.scss";

const Option = Select.Option;

const MOCK_PLAYLIST: IPlaylist[] = [
    {
        name: "A piano image",
        type: "image",
        url: "https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg4NDMxMzUtaW1hZ2Uta3d2eGdwdjEuanBn.jpg",
        duration: 3
    },
    {
        name: "A piano video",
        type: "video",
        url: "https://v3.cdnpk.net/videvo_files/video/free/video0475/large_watermarked/_import_61ff563b7ac975.89975859_preview.mp4",
        duration: 8
    },
    {
        name: "A piano video",
        type: "video",
        url: "https://v3.cdnpk.net/videvo_files/video/free/2014-01/large_watermarked/Musical_Notation_Background_LoopVidevo_preview.mp4",
        duration: 8
    }
];

function App() {
    const [playlist, setPlaylist] = useState<Array<IPlaylist>>(MOCK_PLAYLIST);

    const [formValues, setFormValues] = useReducer((state: any, action: any) => {
        switch (action.type) {
            case "contentName":
                return { ...state, contentName: action.value };
            case "contentUrl":
                return { ...state, contentUrl: action.value };
            case "contentDisplayDuration":
                return { ...state, contentDisplayDuration: action.value };
            case "contentType":
                return { ...state, contentType: action.value };
            default:
                return state;
        }
    }, {});

    const [operationResponse, setOperationResponse] = useState<AxiosResponse<any, any>>();

    const isSubmitDisabled = useMemo(() => {
        return !formValues.contentName || !formValues.contentUrl || !formValues.contentDisplayDuration || !formValues.contentType;
    }, [formValues]);

    useEffect(() => {
        // clear operation response
        setTimeout(() => {
            setOperationResponse(undefined);
        }, 4000);
    }, [operationResponse]);

    const onContentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ type: "contentName", value: event.target.value });
    };

    const onContentUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ type: "contentUrl", value: event.target.value });
    };

    const onContentTypeChange = (value: string) => {
        setFormValues({ type: "contentType", value });
    };

    const onDisplayDurationChange = (value: number | null) => {
        setFormValues({ type: "contentDisplayDuration", value });
    };

    const onSubmit = async () => {
        const payload = { name: formValues.contentName, url: formValues.contentUrl, duration: formValues.contentDisplayDuration, type: formValues.contentType };

        try {
            // const response = await apiClient.post("/add", payload);

            // if (response.status === 200) {
            //     setPlaylist(response.data);
            //     setOperationResponse(response);
            // }

            if (playlist.some(ct => ct.url === payload.url)) {
                setOperationResponse({ status: 400, data: "This content already exist on playlist" } as any);
                return;
            }

            setPlaylist([...playlist, payload]);
            setOperationResponse({ status: 200, data: "Content added successfully" } as any);
        } catch (error: any) {
            setOperationResponse(error?.response as AxiosResponse);
        }
    };

    if (!playlist) {
        return <Spinner />;
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
                    <InputNumber placeholder='Enter duration (seconds)' min={1} onChange={onDisplayDurationChange} />
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
