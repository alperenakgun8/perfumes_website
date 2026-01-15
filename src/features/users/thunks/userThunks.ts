import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, deleteUser, userAuth, updateProfilePicture, updateUser, getUserFavorites, addFavorite, deleteFavorite, userAuthMe } from "../api/userApi";
import type { UserAuth, UserUpdate } from "../api/types";

export const fetchUsers = createAsyncThunk(
    "user/fetchAll",
    async () => {
        const data = await getUsers();
        return data;
    }
);

export const fetchAuthMe = createAsyncThunk(
    "user/fetchAuthMe",
    async (_ , { dispatch }) => {
        const data = await userAuthMe();

        if(data && data._id) dispatch(fetchUserFavorites());

        return data;
    }
);

export const fetchAuthUser = createAsyncThunk(
    "user/fetchAuth",
    async (body: UserAuth, { dispatch }) => {
        const data = await userAuth(body);

        if(data.token) localStorage.setItem("token", data.token);

        if(data.user && data.user._id) dispatch(fetchUserFavorites());

        return data;
    }
);

export const updateExistingUser = createAsyncThunk(
    "user/update",
    async( body: UserUpdate) => {
        const data = await updateUser(body);
        return data;
    }
);

export const updateExistingUserProfilePicture = createAsyncThunk(
    "user/updateProfilePicture",
    async (body: {id: string, file: File}) => {
        const data = await updateProfilePicture(body.id, body.file);
        return data;
    }
);

export const deleteExistingUser = createAsyncThunk(
    "user/delete",
    async(id: string) => {
        await deleteUser(id);
        return id;
    }
);

export const fetchUserFavorites = createAsyncThunk(
    "user/getfavorite",
    async() => {
        const data = await getUserFavorites();
        return data;
    }  
);

export const addUserFavorite = createAsyncThunk(
    "user/addfavorite",
    async(body: {perfume_id: string}) => {
        const data = await addFavorite(body);
        return data;
    }
);

export const deleteUserFavorite = createAsyncThunk(
    "user/deletefavorite",
    async(body: { perfume_id: string}) => {
        const data = await deleteFavorite(body);
        return data;
    }
);