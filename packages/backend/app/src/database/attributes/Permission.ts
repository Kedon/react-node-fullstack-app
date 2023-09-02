export enum EPermissionType {
    PRO = "PRO",
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface Permission {
    id?:number;
    user_uuid?: string;
    type: EPermissionType,
    email: string;
    isActive?: boolean;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}
