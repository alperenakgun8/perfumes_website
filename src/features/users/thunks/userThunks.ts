import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, deleteUser, userLogin, updateProfilePicture, updateUser, getUserFavorites, addFavorite, deleteFavorite } from "../api/userApi";
import type { UserLogin, UserUpdate } from "../api/types";
import { data } from "react-router-dom";

export const fetchUsers = createAsyncThunk(
    "user/fetchAll",
    async () => {
        const data = await getUsers();
        return data;
    }
);

export const fetchLoginUser = createAsyncThunk(
    "user/fetchLogin",
    async (body: UserLogin) => {
        const data = await userLogin(body);
        console.log(data);
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
    async(body: {user_id: string}) => {
        const data = await getUserFavorites(body);
        return data;
    }  
);

export const addUserFavorite = createAsyncThunk(
    "user/addfavorite",
    async(body: {user_id: string, perfume_id: string}) => {
        const data = await addFavorite(body);
        return data;
    }
);

export const deleteUserFavorite = createAsyncThunk(
    "user/deletefavorite",
    async(body: {user_id: string, perfume_id: string}) => {
        const data = await deleteFavorite(body);
        return data;
    }
);