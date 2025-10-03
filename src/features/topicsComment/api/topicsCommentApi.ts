import axiosInstance from "../../../config/axiosInstance";
import type { TopicsComment, AddTopicsComment } from "./types";

export const getUserTopicsComments = async (id: string):
Promise<TopicsComment[]> => {
    const response = await axiosInstance.get(`/commentsoftopics/user/${id}`);
    return response.data.data;
}

export const getTopicsTopicsComment = async (id: string): Promise<TopicsComment[]> => {
    const response = await axiosInstance.get(`/commentsoftopics/topic/${id}`);
    return response.data.data;
}

export const addTopicsComment = async (body: AddTopicsComment): Promise<TopicsComment> => {
    const response = await axiosInstance.post("/commentsoftopics/add", body);
    return response.data.data.data;
}

export const deleteTopicsComment = async (id: string): Promise<string> => {
    await axiosInstance.delete(`/delete/${id}`);
    return id;
}