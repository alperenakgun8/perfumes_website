import axiosInstance from "../../../config/axiosInstance";
import type { GeneralPerfumeInfo } from "../../perfumes/api/types";
import type { User, UserAuth, UserAuthResponse, UserRegister, UserUpdate, UserUpdatePassword, UserUpdatePasswordElement } from "./types";

export const getUsers = async () : Promise<User[]> => {
    const response = await axiosInstance.get("/users/");
    return response.data.data;
}

export const addUser = async (body: UserRegister): Promise<boolean> => {
    const response = await axiosInstance.post("/users/add", body);
    return response.data.data.success
}

export const updateUser = async(body: UserUpdate): Promise<User> => {
    const response = await axiosInstance.post("/users/update", body);
    return response.data.data.data;
}

export const updatePassword = async(body: UserUpdatePassword): Promise<UserUpdatePasswordElement> => {
    const response = await axiosInstance.post("/users/update_password", body);
    return response.data.data;
}

export const userAuthMe = async(): Promise<User> => {
    const response = await axiosInstance.get("/users/auth/me");
    return response.data.data;
}

export const userAuth = async (body: UserAuth) : Promise<UserAuthResponse> => {
    const response = await axiosInstance.post("/users/auth", body);
    return response.data.data;
}

export const deleteUser = async (id: string): Promise<string> => {
    await axiosInstance.delete(`/users/${id}`);
    return id;
}

export const updateProfilePicture = async (id: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("profilePic", file);

    const response = await axiosInstance.post(`/users/upload_profile_picture/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    
    return response.data.data.data.profile_picture;
};

export const addFavorite = async (body: { perfume_id: string }): Promise<GeneralPerfumeInfo> => {
    const response = await axiosInstance.post("/favorites/add", body);
    return response.data.data.data;
}

export const getUserFavorites = async () : Promise<GeneralPerfumeInfo[]> => {
    const response = await axiosInstance.get("/favorites");
    return response.data.data;
}

export const deleteFavorite = async (body: { perfume_id: string}) : Promise<string> => {
    await axiosInstance.post("/favorites/delete", body);
    return body.perfume_id;
}