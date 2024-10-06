import * as fs from "fs";
import { getPathFromProjectRoot } from "./utils/getPathFromProjectRoot";
import { UserDict } from "./types";

const userPath = getPathFromProjectRoot("/data/users.json");

export async function loadUsers(): Promise<UserDict> {
    return JSON.parse(fs.readFileSync(userPath, "utf-8"))
}

export async function writeUsers(users: UserDict) {
    try {
        fs.writeFileSync(userPath, JSON.stringify(users));
        return true;
    }
    catch {
        return false;
    }
}