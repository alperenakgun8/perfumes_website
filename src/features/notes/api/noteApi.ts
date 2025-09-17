import axiosInstance from "../../../config/axiosInstance";
import type { Note } from "./types";

export const getNotes = async (): Promise<Note[]> => {
    const response = await axiosInstance.get("/notes/");
    return response.data.data;
}

export const addNote = async (data: Note): Promise<Note> => {
    const response = await axiosInstance.post("/notes/add", data);
    return response.data.data.data;
}

export const updateNote = async(data: Note & {_id: string}): Promise<Note> => {
    const response = await axiosInstance.post("/notes/update", data);
    return response.data.data.data
}

export const deleteNote = async (id: string): Promise<string> => {
    await axiosInstance.delete(`/notes/${id}`);
    return id;
}