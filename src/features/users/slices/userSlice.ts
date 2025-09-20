import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers, deleteExistingUser } from "../thunks/userThunks";
import type { User } from "../api/types";

export interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        });

        builder.addCase(deleteExistingUser.fulfilled, (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(s => s._id !== action.payload);
        })
    }
});

export const {   } = userSlice.actions

export default userSlice.reducer