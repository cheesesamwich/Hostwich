export interface User {
    name: string;
    pass: string;
    admin: boolean;
    token: string;
}

export interface UserDict {
    [key: string]: User
};
