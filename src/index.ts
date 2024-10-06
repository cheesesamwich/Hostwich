import express from "express";
import { getPathFromProjectRoot } from "./utils/getPathFromProjectRoot";
import * as fs from "fs";
import { uploader } from "./endpoints/uploader";
import { auth } from "./endpoints/auth";
import { cdn } from "./endpoints/cdn";
import cors from "cors";

export const app = express();

const port = 9203;

app.use(cors());

uploader(app);

auth(app);

cdn(app);

app.get("/", (req, res) => { res.send("guh") });

app.listen(port, () => console.log("we outta light bulbs"));