import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTopicsTopicsComment, getUserTopicsComments, addTopicsComment, deleteTopicsComment } from "../api/topicsCommentApi";
import type { AddTopicsComment } from "../api/types";

export const fetchUserTopicsComments = createAsyncThunk(
    "topicsComment/fetchUserTopicsComment",
    async (id: string) => {
        const data = await getUserTopicsComments(id);
        return data;
    }
);

export const fetchTopicsTopicsComment = createAsyncThunk(
    "topicsComment/fetchTopicsTopicsComment",
    async (id: string) => {
        const data = await getTopicsTopicsComment(id);
        return data;
    }
);

export const addTopicsCommentToTopicAndUser = createAsyncThunk(
    "topicsComment/addTopicsComment",
    async (body: AddTopicsComment) => {
        const data = await addTopicsComment(body);
        return data;
    }
);

export const deleteTopicsCommentFromTopicAndUser = createAsyncThunk(
    "topicsComment/deleteTopicsComment",
    async (id: string) => {
        const data = await deleteTopicsComment(id);
        return data;
    }
);