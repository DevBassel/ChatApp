
export interface RegisterDto extends LoginDto {
  name: string;
  role: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
