import { mediaTypes } from "../utils/constants";

const MOCK_PLAYLIST = [
    {
        name: "An image",
        type: mediaTypes.image,
        url: "https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg4NDMxMzUtaW1hZ2Uta3d2eGdwdjEuanBn.jpg",
        duration: 3
    },
    {
        name: "A video",
        type: mediaTypes.video,
        url: "https://file-examples.com/storage/fee30f8f8a62ab4b89f1e8c/2017/04/file_example_MP4_1920_18MG.mp4",
        duration: 5
    }
];

export const getList = () => MOCK_PLAYLIST;

export const addList = ({ name, type, url, duration }) => {
    MOCK_PLAYLIST.push({ name, type, url, duration });
    return MOCK_PLAYLIST;
};
