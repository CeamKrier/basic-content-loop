import express from "express";

import { verifyPayload } from "../middleware/verifyPayload";
import { addList, getList } from "../services/playlist";

const router = express.Router();

router.get("/playlist", (_, response) => {
    const playlist = getList();
    response.send(playlist);
});

router.post("/add", verifyPayload, async (request, response) => {
    const playlist = getList();
    if (playlist.some(content => content.url === request.body?.url)) {
        return response.status(406).send("Given URL already included to playlist.");
    }

    const updatedPlaylist = addList(request.body);
    response.send(updatedPlaylist);
});

export default router;
