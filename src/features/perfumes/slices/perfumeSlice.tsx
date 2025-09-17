import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Perfume } from "../api/types";

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

    }
});

export const {   } = perfumeSlice.actions

export default perfumeSlice.reducer