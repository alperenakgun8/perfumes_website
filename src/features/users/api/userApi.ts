import axiosInstance from "../../../config/axiosInstance";
import type { User } from "./types";

export const getUsers = async () : Promise<User[]> => {
    const response = await axiosInstance.get("/users/");
    return response.data.data;
}

export const deleteUser = async (id: string): Promise<string> => {
    await axiosInstance.delete(`/users/${id}`);
    return id;
}