export interface UpdateUserDTO {
    user_id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role_id: string;
    gender: string;
    phone_number?: string;
}