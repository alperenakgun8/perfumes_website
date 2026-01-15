export interface User {
    _id?: string,
    email: string,
    first_name: string,
    last_name: string,
    nickname: string,
    profile_picture: string,
    language: string,
    role: "USER" | "ADMIN" | "SUPER_ADMIN",
}

export interface UserAuth {
    email: string,
    password: string
}

export interface UserAuthResponse {
    token: string,
    user: User,
}

export interface UserRegister {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    nickname: string
}

export interface UserUpdatePassword {
    user_id: string,
    new_password: string,
    old_password: string
}

export interface UserUpdatePasswordElement {
    success: boolean,
    message: string
}

export interface UserUpdate {
    _id: string,
    first_name: string,
    last_name: string,
    nickname: string
}