import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTopic, deleteTopic, getTopicById, getTopics } from "../api/topicApi";
import type { AddTopic } from "../api/types";

export const fetchTopics = createAsyncThunk(
    "topics/fetchTopics",
    async() => {
        const data = await getTopics();
        return data;
    }
);

export const fetchTopicById = createAsyncThunk(
    "topics/fetchTopicById",
    async(id: string) => {
        const data = await getTopicById(id);
        return data;
    }
);

export const addTopicToDB = createAsyncThunk(
    "topics/addTopictoDB",
    async(body: AddTopic) => {
        const data = await addTopic(body);
        return data;
    }
);

export const deleteTopicFromDB = createAsyncThunk(
    "topics/deleteTopicFromDB",
    async(id: string) => {
        const data = await deleteTopic(id);
        return data;
    }  
);
