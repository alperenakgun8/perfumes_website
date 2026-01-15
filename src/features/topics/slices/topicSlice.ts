import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Topic } from "../api/types";
import { addTopicToDB, deleteTopicFromDB, fetchTopics } from "../thunks/topicThunk";

export interface TopicState {
    topic: Topic[]
}

const initialState: TopicState = {
    topic: []
}

export const topicSlice = createSlice({
    name: "topic",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTopics.fulfilled, (state, action:PayloadAction<Topic[]>) => {
            state.topic = action.payload;
        });

        builder.addCase(addTopicToDB.fulfilled, (state, action: PayloadAction<Topic>) => {
            state.topic = [action.payload, ...state.topic];
        });

        builder.addCase(deleteTopicFromDB.fulfilled, (state, action: PayloadAction<string>) => {
            state.topic = state.topic.filter(t => t._id !== action.payload);
        });
    }
});

// export const {   } = topicSlice.actions

export default topicSlice.reducer