import { loadUsers } from "../dataLoader";
import { UserDict } from "../types";

export function auth(app) {
    app.get("/auth", async (req, res) => {
        const { user, pass }: { user: string; pass: string; } = req.query as any;

        if (!user || !pass) {
            res.status(422).send("Incorrect parameters");
        }

        const users: UserDict = await loadUsers();

        if (!users) {
            res.status(500).send("Failed to load users");
        }

        const logUser = users[user];

        if (logUser) {
            if (logUser.pass == pass) {
                res.status(200).json({ token: logUser.token, name: logUser.name });
            }
            else {
                res.status(403).send("No access");
            }
        }
    });

}