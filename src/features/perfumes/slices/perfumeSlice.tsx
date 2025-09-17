import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Perfume } from "../api/types";
import { fetchPerfumes, addNewPerfume, deleteExistingPerfume, updateExistingPerfume } from "../thunks/perfumeThunks";

export interface PerfumeState {
    perfumes: Perfume[];
}

const initialState: PerfumeState = {
    perfumes: []
}

export const perfumeSlice = createSlice({
    name: "perfume",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPerfumes.fulfilled, (state, action: PayloadAction<Perfume[]>) => {
            state.perfumes = action.payload;
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