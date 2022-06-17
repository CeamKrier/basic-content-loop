import { mediaTypes } from "../utils/constants";

const MOCK_PLAYLIST = [
    {
        name: "A piano image",
        type: mediaTypes.image,
        url: "https://images.rawpixel.com/image_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg4NDMxMzUtaW1hZ2Uta3d2eGdwdjEuanBn.jpg",
        duration: 3
    },
    {
        name: "A piano video",
        type: mediaTypes.video,
        url: "https://cdn.videvo.net/videvo_files/video/free/2014-01/large_watermarked/Piano_Keys_Track_Along_1_preview.mp4",
        duration: 5
    }
];

export const getList = () => MOCK_PLAYLIST;

export const addList = ({ name, type, url, duration }) => {
    MOCK_PLAYLIST.push({ name, type, url, duration });
    return MOCK_PLAYLIST;
};
