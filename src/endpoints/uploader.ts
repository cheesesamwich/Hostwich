import express from "express";
import { getPathFromProjectRoot } from "../utils/getPathFromProjectRoot";
import multer from "multer";
import { loadUsers } from "../dataLoader";
import { UserDict } from "../types";

export function uploader(app) {
    app.use(express.static(getPathFromProjectRoot("/src/public")));

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, getPathFromProjectRoot("/data/files"));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const upload = multer({ storage: storage });

    app.post('/upload', upload.single('file'), async (req: any, res: any) => {
        const token: string = req.query.token as string;

        if (!token) {
            return res.status(401).send("Token is required");
        }

        const users: UserDict = await loadUsers();

        const authenticatedUser = Object.values(users).find(user => user.token === token);

        if (!authenticatedUser) {
            return res.status(403).send("Invalid token");
        }

        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        return res.json({ file: `https://api.hostwich.com/cdn/${req.file.filename}` });
    });
}