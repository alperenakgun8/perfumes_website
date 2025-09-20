import React, {useEffect} from 'react';
import type { AppDispatch, RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../thunks/userThunks';

import { 
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
 } from '@mui/material';
import { useUserForm } from '../hooks/useUserForm';

const UserList: React.FC = () => {

   const { users } = useUserForm();

  return (
    <Card sx={{maxWidth: 1000, margin: "2rem auto", boxShadow: 3}}>
       <CardContent>
         <Typography variant='h5' gutterBottom>
            User List
        </Typography>

        {users.length === 0 ? (
            <Typography> No user found</Typography>
        ) : (
            <List>
                {users.map((u, index) => (
                    <React.Fragment key={u._id}>
                        <ListItem>
                            <ListItemText primary={`${u.first_name} ${u.last_name}`}>
                            </ListItemText>
                            <ListItemText primary={u.email}>
                            </ListItemText>
                        </ListItem>
                        {index < users.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        )}
       </CardContent>
    </Card>
  )
}

export default UserList