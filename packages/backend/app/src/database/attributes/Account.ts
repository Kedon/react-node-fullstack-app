export interface Account {
    account_id: number;
    account_uuid: string
    fisrt_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password?: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}