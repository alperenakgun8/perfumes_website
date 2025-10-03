import axiosInstance from "../../../config/axiosInstance";
import type { Comment, AddComment } from "./types";

export const getUserComments = async (id: string): Promise<Comment[]> => {
    const response = await axiosInstance.get(`/comments/user/${id}`);
    return response.data.data;
}

export const getPerfumeComments = async (id: string): Promise<Comment[]> => {
    const response = await axiosInstance.get(`/comments/perfume/${id}`);
    return response.data.data;
}

export const addComment = async (body: AddComment): Promise<Comment> => {
    const response = await axiosInstance.post("/comments/add", body);
    return response.data.data.data;
}

export const deleteComment = async (id: string): Promise<string> => {
    await axiosInstance.delete(`/comments/${id}`);
    return id;
}