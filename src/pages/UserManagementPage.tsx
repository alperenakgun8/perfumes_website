import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { useEffect } from "react";
import { fetchUsers } from "../features/users/thunks/userThunks";

import UserList from "../features/users/components/UserList";
import DeleteUser from "../features/users/components/DeleteUser";

import { 
    Card,
    CardContent,
    Grid
 } from "@mui/material";

function UserManagementPage () {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUsers());
    },[dispatch]);

return(
    <Card sx={{ maxWidth: '100%', margin: "2rem auto", padding: 2 }}>
        <CardContent>
            <Grid container spacing={2}>
                <Grid size = {{xs: 12}}>
                    <UserList />
                </Grid>
                <Grid size = {{xs: 12}}>
                    <DeleteUser />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
)
}

export default UserManagementPage