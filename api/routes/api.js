import express from "express";

import { verifyPayload } from "../middleware/verifyPayload";
import { addList, getList } from "../services/playlist";

const router = express.Router();

router.get("/playlist", (_, response) => {
    const playlist = getList();
    response.send(playlist);
});

router.post("/add", verifyPayload, async (request, response) => {
    const updatedPlaylist = addList(request.body);
    response.send(updatedPlaylist);
});

export default router;
