export interface User {
    _id?: string,
    email: string,
    first_name: string,
    last_name: string,
    nickname: string,
    role: "User" | "Admin" | "Super Admin",
    profile_picture: string
}

export interface UserLogin {
    email: string,
    password: string
}

export interface UserRegister {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    nickname: string
}

export interface UserLoginElement {
    user: User,
    is_admin: boolean,
    is_super_admin: boolean,
    success: boolean
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