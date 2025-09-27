import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Perfume, PerfumeAdd } from "../api/types";
import { getPerfumes, addPerfume, updatePerfume, deletePerfume, getPerfumeByNotes, getPerfumesWithGeneralInfo, getBrands, getPerfumeByFilter } from "../api/perfumeApi";

export const fetchPerfumes = createAsyncThunk(
    "perfume/fetchAll",
    async() => {
        const data = await getPerfumes();
        return data;
    }
);

export const fetchBrands = createAsyncThunk(
    "perfume/fetchBrands",
    async() => {
        const data = await getBrands();
        return data;
    }
);

export const fetchSelectedPerfumes = createAsyncThunk(
    "perfume/fetchSelectedPerfumes",
    async () => {
        const data = await getPerfumesWithGeneralInfo();
        return data;
    }
);

export const fetchPerfumesByFilter = createAsyncThunk(
    "perfume/fetchPerfumeByFilter",
    async(body: {genders: string[], concentrations: string[], brands: string[]}) => {
        const data = await getPerfumeByFilter(body);
        return data;
    }
);

export const fetchPerfumesByNotes = createAsyncThunk(
    "perfume/fetchByNotes",
    async(noteIds: string[]) => {
        const data = await getPerfumeByNotes(noteIds);
        return data;
    }
);

export const addNewPerfume = createAsyncThunk(
    "perfume/add",
    async (perfumeAdd: PerfumeAdd) => {
        const newPerfume = await addPerfume(perfumeAdd);
        return newPerfume;
    }
);

export const updateExistingPerfume = createAsyncThunk<Perfume, PerfumeAdd & {_id: string}>(
    "perfume/update",
    async (perfumeAdd: PerfumeAdd & {_id: string}) => {
        const updated = await updatePerfume(perfumeAdd);
        return updated;
    }
);

export const deleteExistingPerfume = createAsyncThunk(
    "perfume/delete",
    async(id: string) => {
        await deletePerfume(id);
        return id;
    }
);