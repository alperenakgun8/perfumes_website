import UserList from "../../features/users/components/UserList";
import DeleteUser from "../../features/users/components/DeleteUser";

import { 
    Card,
    CardContent,
    Grid
 } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchUsers } from "../../features/users/thunks/userThunks";

function UserManagementPage () {

    const dispatch = useDispatch<AppDispatch>();
    const isSuperAdmin = useSelector((state: RootState) => state.user.isSuperAdmin);

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
                {
                    isSuperAdmin && (
                        <Grid size = {{xs: 12}}>
                            <DeleteUser />
                        </Grid>
                    )
                }
            </Grid>
        </CardContent>
    </Card>
)
}

export default UserManagementPage