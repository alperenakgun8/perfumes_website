import axiosInstance from "../../../config/axiosInstance";
import type { Perfume, PerfumeAdd, PerfumeDetail } from "./types";

export const getPerfumes = async (): Promise<Perfume[]> => {
    const response = await axiosInstance.get("/perfumes");
    return response.data.data;
}

export const getPerfumeById = async(id: string): Promise<PerfumeDetail> => {
    const response = await axiosInstance.get(`/perfumes/${id}`);
    return response.data.data;
}

export const addPerfume = async (data: PerfumeAdd): Promise<Perfume> => {
    const response = await axiosInstance.post("/perfumes/add", data);
    return response.data.data.data;
}

export const deletePerfume = async (id: string): Promise<string> => {
    await axiosInstance.delete(`/perfumes/${id}`);
    return id;
}