import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, deleteUser } from "../api/userApi";

export const fetchUsers = createAsyncThunk(
    "user/fetchAll",
    async () => {
        const data = await getUsers();
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