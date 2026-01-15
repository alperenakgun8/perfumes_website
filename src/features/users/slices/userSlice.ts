import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchAuthUser, updateExistingUserProfilePicture, updateExistingUser, fetchUserFavorites, addUserFavorite, deleteUserFavorite, fetchAuthMe, fetchUsers} from "../thunks/userThunks";
import type { User, UserAuthResponse } from "../api/types";
import type { GeneralPerfumeInfo } from "../../perfumes/api/types";

export interface UserState {
    users: User[],
    user: User,
    favorites: GeneralPerfumeInfo[]
}

const initialState: UserState = {
    users: [],
    user: {_id: "", email: "", first_name: "", last_name: "", nickname: "", role: "USER" , profile_picture: "", language: "TR"},
    favorites: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = { _id: "", email: "", first_name: "", last_name: "", nickname: "", role: "USER" , profile_picture: "", language: "TR"};
            state.favorites = [];
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        });

        builder.addCase(fetchAuthUser.fulfilled, (state, action: PayloadAction<UserAuthResponse>) => {
           state.user = action.payload.user;
        });

        builder.addCase(fetchAuthUser.rejected, (state, action) => {
            console.error("Login failed: ", action.error);
        });

        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.user = action.payload;
        });

        builder.addCase(updateExistingUserProfilePicture.fulfilled, (state, action: PayloadAction<string>) => {
            state.user.profile_picture = action.payload;
        });

        builder.addCase(updateExistingUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        });

        // builder.addCase(deleteExistingUser.fulfilled, (state, action: PayloadAction<string>) => {
        //     state.users = state.users.filter(s => s._id !== action.payload);
        // });

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