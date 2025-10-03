import axiosInstance from "../../../config/axiosInstance";
import type { AddTopic, Topic } from "./types";

export const getTopics = async (): Promise<Topic[]> => {
    const response = await axiosInstance.get("/topics");
    return response.data.data;
}

export const getTopicById = async (id: string): Promise<Topic> => {
    const response = await axiosInstance.get(`/topics/${id}`);
    return response.data.data;
}

export const addTopic = async(body: AddTopic): Promise<Topic> => {
    const response = await axiosInstance.post("/topics/add", body);
    return response.data.data.data;
}

export const deleteTopic = async(id: string): Promise<string> => {
    const response = await axiosInstance.delete(`/topics/${id}`);
    return response.data.data;
}