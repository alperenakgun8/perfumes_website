import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TopicsComment } from "../api/types";
import { fetchTopicsTopicsComment, fetchUserTopicsComments, addTopicsCommentToTopicAndUser, deleteTopicsCommentFromTopicAndUser } from "../thunks/topicsCommentThunk";

export interface TopicsCommentState {
    userComments: TopicsComment[],
    topicComments: TopicsComment[]
}

const initialState: TopicsCommentState = {
    userComments: [],
    topicComments: []
}

export const topicsCommentSlice = createSlice({
    name: "topicsComment",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserTopicsComments.fulfilled, (state, action: PayloadAction<TopicsComment[]>) => {
            state.userComments = action.payload;
        });

        builder.addCase(fetchTopicsTopicsComment.fulfilled, (state, action: PayloadAction<TopicsComment[]>) => {
            state.topicComments = action.payload;
        });

        builder.addCase(addTopicsCommentToTopicAndUser.fulfilled, (state, action: PayloadAction<TopicsComment>) => {
            state.topicComments = [action.payload, ...state.topicComments];
            state.userComments = [action.payload, ...state.userComments];
        });

        builder.addCase(deleteTopicsCommentFromTopicAndUser.fulfilled, (state, action: PayloadAction<string>) => {
            state.topicComments = state.topicComments.filter(c => c._id !== action.payload);
            state.userComments = state.userComments.filter(c => c._id !== action.payload);
        });
    }
});

// export const {   } = topicsCommentSlice.actions

export default topicsCommentSlice.reducer