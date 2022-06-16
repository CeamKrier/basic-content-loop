import express from "express";
import bodyParser from "body-parser";
import compression from "compression";

import ApiRoute from "./routes/api";

const server = express();
const port = 1955;

server
    .disable("x-powered-by")
    .use(compression()) // check
    .use(bodyParser.json()) // check
    .use(bodyParser.urlencoded({ extended: true })) // check
    .use("/api", ApiRoute);

server.listen(port, () => {
    console.log(`The API is up and running at the port ${port}`);
});
