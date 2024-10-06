import { getPathFromProjectRoot } from "../utils/getPathFromProjectRoot";
import * as fs from "fs";

export function cdn(app) {
    app.get("/cdn/:filename", (req, res) => {
        if (!("filename" in req.params)) {
            res.status(404).send();
        }
        const { filename } = req.params;

        const absolutePath = `${getPathFromProjectRoot("/data/files")}/${filename}`;

        if (!fs.existsSync(absolutePath)) {
            res.status(404).send("No file :(((((");
            return;
        }

        res.sendFile(absolutePath);
    })
}