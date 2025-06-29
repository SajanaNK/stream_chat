interface UserProps {
    id: string;
    username: string;
    email?: string;
    remoteAddress?: string;
}
declare class User {
    id: string;
    username: string;
    email?: string;
    remoteAddress?: string;
    password?: string;
    constructor({ id, username, email, remoteAddress }: UserProps);
    generateAuthToken(): string;
}
export { User, UserProps };
//# sourceMappingURL=user.d.ts.map