import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers, deleteExistingUser, fetchLoginUser, updateExistingUserProfilePicture, updateExistingUser, fetchUserFavorites, addUserFavorite, deleteUserFavorite } from "../thunks/userThunks";
import type { User, UserLoginElement } from "../api/types";
import type { GeneralPerfumeInfo } from "../../perfumes/api/types";

export interface UserState {
    users: User[];
    isAuthenticated: boolean,
    isAdmin: boolean,
    isSuperAdmin: boolean,
    user: User
    favorites: GeneralPerfumeInfo[]
}

const initialState: UserState = {
    users: [],
    isAuthenticated: false,
    isAdmin: false,
    isSuperAdmin: false,
    user: { email: "", first_name: "", last_name: "", role: "User", profile_picture: "", nickname: "" },
    favorites: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.isSuperAdmin = false;
            state.user = { email: "", first_name: "", last_name: "", role: "User", profile_picture:"", nickname: ""};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        });

        builder.addCase(fetchLoginUser.fulfilled, (state, action: PayloadAction<UserLoginElement>) => {
            console.log(action.payload);
            state.user = action.payload.user;
            state.isAdmin = action.payload.is_admin;
            state.isSuperAdmin = action.payload.is_super_admin;
            state.isAuthenticated = action.payload.success;
        });

        builder.addCase(updateExistingUserProfilePicture.fulfilled, (state, action: PayloadAction<string>) => {
            state.user.profile_picture = action.payload;
        });

        builder.addCase(updateExistingUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        });

        builder.addCase(fetchLoginUser.rejected, (state, action) => {
            console.error("Login failed: ", action.error);
            state.isAuthenticated = false;
        });

        builder.addCase(deleteExistingUser.fulfilled, (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(s => s._id !== action.payload);
        });

        builder.addCase(fetchUserFavorites.fulfilled, (state, action: PayloadAction<GeneralPerfumeInfo[]>) => {
            state.favorites = action.payload;
        });

        builder.addCase(addUserFavorite.fulfilled, (state, action: PayloadAction<GeneralPerfumeInfo>) => {
            state.favorites = [ ...state.favorites, action.payload ];
        });

        builder.addCase(deleteUserFavorite.fulfilled, (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(f => f._id !== action.payload);
        });
    }
});

export const { logout } = userSlice.actions

export default userSlice.reducer