import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Perfume, GeneralPerfumeInfo, PerfumeDetail } from "../api/types";
import { fetchPerfumes, addNewPerfume, deleteExistingPerfume, updateExistingPerfume, fetchPerfumesByNotes, fetchPerfumeById, fetchSelectedPerfumes, fetchBrands, fetchPerfumesByFilter } from "../thunks/perfumeThunks";
export interface PerfumeState {
    perfumes: Perfume[];
    selectedPerfumes: GeneralPerfumeInfo[];
    perfumeDetail: PerfumeDetail;
    brands: string[];
}

const initialState: PerfumeState = {
    perfumes: [],
    selectedPerfumes: [],
    perfumeDetail: {name: "", brand:"", concentration_id: {_id: "", name: "", display_name: ""}, description: "", gender: "", image_url: "", _id: "", notes:[]},
    brands: []
}

export const perfumeSlice = createSlice({
    name: "perfume",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchBrands.fulfilled, (state,action: PayloadAction<string[]>) => {
            state.brands = action.payload;
        });

        builder.addCase(fetchPerfumesByFilter.fulfilled, (state, action: PayloadAction<GeneralPerfumeInfo[]>) => {
            state.selectedPerfumes = action.payload;
        });

        builder.addCase(fetchPerfumes.fulfilled, (state, action: PayloadAction<Perfume[]>) => {
            state.perfumes = action.payload;
        });

        builder.addCase(fetchSelectedPerfumes.fulfilled, (state, action: PayloadAction<GeneralPerfumeInfo[]>) => {
            state.selectedPerfumes = action.payload;
        });
        
        builder.addCase(fetchPerfumesByNotes.fulfilled, (state, action: PayloadAction<GeneralPerfumeInfo[]>) => {
            state.selectedPerfumes = action.payload;
        });

        builder.addCase(fetchPerfumeById.fulfilled, (state, action: PayloadAction<PerfumeDetail>) => {
            state.perfumeDetail = action.payload;
        });

        builder.addCase(addNewPerfume.fulfilled, (state, action) => {
            state.perfumes.push(action.payload);
        });

        builder.addCase(updateExistingPerfume.fulfilled, (state,action) => {
            const index = state.perfumes.findIndex(c => c._id === action.payload._id);
            if(index !== -1) state.perfumes[index] = action.payload;
        });

        builder.addCase(deleteExistingPerfume.fulfilled, (state, action: PayloadAction<string>) => {
            state.perfumes = state.perfumes.filter(p => p._id !== action.payload);
        });
    }
});

export const {   } = perfumeSlice.actions

export default perfumeSlice.reducer