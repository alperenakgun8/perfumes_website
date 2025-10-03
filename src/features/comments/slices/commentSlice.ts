import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "../api/types";
import { addCommentToPerfumeAndUser, deleteCommentFromPerfumeAndUser, fetchPerfumeComments, fetchUserComments } from "../thunks/commentThunk";

export interface CommentState {
    userComments: Comment[],
    perfumeComments: Comment[]
}

const initialState: CommentState = {
    userComments: [],
    perfumeComments: []
}

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
            state.userComments = action.payload;
        });

        builder.addCase(fetchPerfumeComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
            state.perfumeComments = action.payload;
        });

        builder.addCase(addCommentToPerfumeAndUser.fulfilled, (state, action: PayloadAction<Comment>) => {
            state.perfumeComments = [action.payload, ...state.perfumeComments];
            state.userComments  = [action.payload, ...state.userComments];
        });

        builder.addCase(deleteCommentFromPerfumeAndUser.fulfilled, (state, action:PayloadAction<string>) => {
            state.perfumeComments = state.perfumeComments.filter(c => c._id !== action.payload);
            state.userComments = state.userComments.filter(c => c._id !== action.payload);
        })
    }
});

export const {   } = commentSlice.actions
export default commentSlice.reducer