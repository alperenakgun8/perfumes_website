import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Note } from "../api/types";
import { getNotes, addNote, updateNote, deleteNote } from "../api/noteApi";

export const fetchNotes = createAsyncThunk(
    "note/fetchAll",
    async () => {
        const data = await getNotes();
        return data;
    }
);

export const addNewNote = createAsyncThunk(
    "note/add",
    async(note: Note) => {
        const newNote = await addNote(note);
        return newNote;
    }
);

export const updateExistingNote = createAsyncThunk<Note, Note & {_id: string}>(
    "note/update",
    async (note: Note & {_id: string}) => {
        const updated = await updateNote(note);
        return updated;
    }
);

export const deleteExistingNote = createAsyncThunk(
    "note/delete",
    async(id: string) => {
        await deleteNote(id);
        return id;
    }
);