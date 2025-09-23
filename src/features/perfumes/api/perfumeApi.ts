import axiosInstance from "../../../config/axiosInstance";
import type { Perfume, PerfumeAdd, PerfumeDetail, GeneralPerfumeInfo } from "./types";

export const getPerfumes = async (): Promise<Perfume[]> => {
    const response = await axiosInstance.get("/perfumes");
    return response.data.data;
}

export const getPerfumesWithGeneralInfo = async() : Promise<GeneralPerfumeInfo[]> => {
    const response = await axiosInstance.get("/perfumes/general");
    console.log(response.data.data);
    return response.data.data;
}

export const getPerfumeById = async(id: string): Promise<PerfumeDetail> => {
    const response = await axiosInstance.get(`/perfumes/${id}`);
    return response.data.data;
}

export const getBrands = async(): Promise<string[]> => {
    const response = await axiosInstance.get('/perfumes/brands');
    return response.data.data;
} 

export const getPerfumeByNotes = async(noteIds: string[]): Promise<GeneralPerfumeInfo[]> => {
    const response = await axiosInstance.post("/perfumes/bynoteid", { noteIds });
    console.log(response.data.data);
    return response.data.data;
}

export const getPerfumeByFilter = async(body: {genders: string[], concentrations: string[], brands: string[]}): Promise<GeneralPerfumeInfo[]> => {
    const response = await axiosInstance.post("/perfumes/filter", body);
    return response.data.data.data;
}

export const addPerfume = async (data: PerfumeAdd): Promise<Perfume> => {
    const response = await axiosInstance.post("/perfumes/add", data);
    return response.data.data.data;
}

export const updatePerfume = async (data: PerfumeAdd & { _id:string }): Promise<Perfume> => {
    const response = await axiosInstance.post("/perfumes/update", data);
    return response.data.data.data;
}

export const deletePerfume = async (id: string): Promise<string> => {
    await axiosInstance.delete(`/perfumes/${id}`);
    return id;
}