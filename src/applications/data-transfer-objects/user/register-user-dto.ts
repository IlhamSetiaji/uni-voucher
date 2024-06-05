export interface RegisterUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  role_id: string;
  gender: string;
  phone_number?: string;
}
