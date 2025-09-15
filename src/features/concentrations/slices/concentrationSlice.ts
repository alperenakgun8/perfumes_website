import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchConcentrations, addNewConcentration, updateExistingConcentration, deleteExistingConcentration } from "../thunks/concentrationThunks";

export interface Concentration {
    _id?: string,
    name: string;
    display_name: string;
}

export interface ConcentrationState {
    concentrations: Concentration[];
}

const initialState: ConcentrationState = {
    concentrations: []
}

export const concentrationSlice = createSlice({
    name: 'concentration',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // fetch
        builder.addCase(fetchConcentrations.fulfilled, (state, action: PayloadAction<Concentration[]>) => {
            state.concentrations = action.payload;
        });

        // add
        builder.addCase(addNewConcentration.fulfilled, (state, action) => {
        state.concentrations.push(action.payload);
        });

        // update
        builder.addCase(updateExistingConcentration.fulfilled, (state, action) => {
        const index = state.concentrations.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.concentrations[index] = action.payload;
        });

        // delete
        builder.addCase(deleteExistingConcentration.fulfilled, (state, action: PayloadAction<string>) => {
        state.concentrations = state.concentrations.filter(c => c._id !== action.payload);
        });
    }
});

export const {   } = concentrationSlice.actions

export default concentrationSlice.reducer