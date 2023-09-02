export interface User {
    id?: number;
    uuid?: string;
    name?: string;
    email: string;
    password?: string;
    type?: string;
    isActive?: boolean;
    comparePassword?: (password: string) => Promise<boolean>;
    createdAt?: string;
    updatedAt?: string;
}