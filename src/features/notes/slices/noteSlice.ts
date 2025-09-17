import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchNotes, addNewNote, updateExistingNote, deleteExistingNote } from "../thunks/noteThunks";
import type { Note } from '../api/types'

export interface NoteState {
    notes: Note[];
}

const initialState: NoteState = {
    notes: []
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //fetch
        builder.addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
            state.notes = action.payload;
        } );

        //add
        builder.addCase(addNewNote.fulfilled, (state, action) => {
            state.notes.push(action.payload);
        });

        //update
        builder.addCase(updateExistingNote.fulfilled, (state,action) => {
            const index = state.notes.findIndex(c => c._id === action.payload._id);
            if(index !== -1) state.notes[index] = action.payload;
        });

        //delete
        builder.addCase(deleteExistingNote.fulfilled, (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(c => c._id !== action.payload);
        });
    }
});

export const {   } = noteSlice.actions

export default noteSlice.reducer