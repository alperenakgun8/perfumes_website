import axios from "axios";
import axiosInstance from "../../../config/axiosInstance";
import type { GeneralPerfumeInfo } from "../../perfumes/api/types";
import type { User, UserLogin, UserLoginElement, UserRegister, UserUpdate, UserUpdatePassword, UserUpdatePasswordElement } from "./types";

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
    const response = await axiosInstance.post("/users/updatepassword", body);
    return response.data.data;
}

export const userLogin = async (body: UserLogin) : Promise<UserLoginElement> => {
    const response = await axiosInstance.post("/users/getUser", body);
    return response.data.data.data;
}

export const deleteUser = async (id: string): Promise<string> => {
    await axiosInstance.delete(`/users/${id}`);
    return id;
}

export const updateProfilePicture = async (id: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("profilePic", file);

    const response = await axiosInstance.post(`/users/uploadProfilePic/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    
    return response.data.data.data.profile_picture;
};

export const addFavorite = async (body: {user_id: string, perfume_id: string}): Promise<GeneralPerfumeInfo> => {
    const response = await axiosInstance.post("/users/favorites/add", body);
    return response.data.data.data;
}

export const getUserFavorites = async (body: {user_id: string}) : Promise<GeneralPerfumeInfo[]> => {
    const response = await axiosInstance.post("/users/favorites", body);
    return response.data.data.data;
}

export const deleteFavorite = async (body: {user_id: string, perfume_id: string}) : Promise<string> => {
    await axiosInstance.post("/users/favorites/delete", body);
    return body.perfume_id;
}