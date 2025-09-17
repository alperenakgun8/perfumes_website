import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Concentration } from "../api/types";
import { getConcentrations, addConcentration, updateConcentration, deleteConcentration } from "../api/concentrationApi";

export const fetchConcentrations = createAsyncThunk(
    "concentration/fetchAll",
    async () => {
        const data = await getConcentrations();
        return data;
    }
);

export const addNewConcentration = createAsyncThunk(
    "concentration/add",
    async (concentration: Concentration) => {
        const newConcentration = await addConcentration(concentration);
        return newConcentration;
    }
);

export const updateExistingConcentration = createAsyncThunk<Concentration, Concentration & {_id: string}>(
    "concentration/update",
    async(concentration: Concentration & {_id: string}) => {
        const updated = await updateConcentration(concentration);
        return updated;
    } 
);

export const deleteExistingConcentration = createAsyncThunk(
    "concentration/delete",
    async(id: string) => {
        await deleteConcentration(id);
        return id;
    }
);