import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserComments, getPerfumeComments, addComment, deleteComment } from "../api/commentApi";
import type { AddComment } from "../api/types";

export const fetchUserComments = createAsyncThunk(
    "comment/fetchUserComment",
    async (id: string) => {
        const data = await getUserComments(id);
        return data;
    }
);

export const fetchPerfumeComments = createAsyncThunk(
    "comment/fetchPerfumeComment",
    async (id: string) => {
        const data = await getPerfumeComments(id);
        return data;
    }
);

export const addCommentToPerfumeAndUser = createAsyncThunk(
    "comment/addComment",
    async (body: AddComment) => {
        const data = await addComment(body);
        return data;
    }
);

export const deleteCommentFromPerfumeAndUser = createAsyncThunk(
    "comment/deleteComment",
    async (id: string) => {
        const data = await deleteComment(id);
        return data;
    }
);