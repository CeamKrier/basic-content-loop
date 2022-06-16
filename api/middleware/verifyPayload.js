import nodeURL from "url";

import { mediaTypes } from "../utils/constants";

const isURLValid = url => {
    try {
        new nodeURL.URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

export const verifyPayload = async (req, res, next) => {
    const { name, url, type, duration } = req.body;

    let isValid = true;
    let errorMessage;
    const mediaTypeValues = Object.values(mediaTypes);

    if (typeof name !== "string") {
        isValid = false;
        errorMessage = "Provided name should be a string";
    } else if (typeof url !== "string" || !isURLValid(url)) {
        isValid = false;
        errorMessage = "Provided URL could not validated";
    } else if (typeof type !== "string" || !mediaTypeValues.some(mediaType => mediaType === type)) {
        isValid = false;
        errorMessage = `Content type should be one of the following: [${mediaTypeValues.join(",")}]`;
    } else if (isNaN(+duration) || +duration <= 0) {
        isValid = false;
        errorMessage = `Content display duration should be a number greater than 0`;
    }

    if (!isValid) {
        return res.status(400).send(errorMessage);
    }

    next();
};
