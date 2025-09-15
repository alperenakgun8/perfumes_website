import axiosInstance from "../../../config/axiosInstance";
import type { Concentration } from "../slices/concentrationSlice";

export const getConcentrations = async (): Promise<Concentration[]> => {
    const response = await axiosInstance.get("/concentrations/");
    console.log(response);
    return response.data.data;
};

export const addConcentration = async (data: Concentration): Promise<Concentration> => {
    const response = await axiosInstance.post("/concentrations/add", data);
    return response.data.data.data;
};

export const updateConcentration = async (data: Concentration & {_id: string}): Promise<Concentration> => {
    const response = await axiosInstance.post("/concentrations/update", data);
    return response.data.data.data;
};

export const deleteConcentration = async (id: string): Promise<string> => {
    await axiosInstance.delete(`/concentrations/${id}`);
    return id;
};