import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchNotes } from '../features/notes/thunks/noteThunks';
import type { AppDispatch } from '../app/store';

import NoteList from '../features/notes/components/NoteList';
import AddNote from '../features/notes/components/AddNote';
import DeleteNote from '../features/notes/components/DeleteNote';
import UpdateNote from '../features/notes/components/UpdateNote';

import { 
  Card,
  CardContent,
  Grid
 } from '@mui/material';

function NoteManagementPage() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect (() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
      <Card sx={{ maxWidth: '100%', margin: "2rem auto", padding: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{xs: 12}}>
              <NoteList/>
            </Grid>
            <Grid size= {{xs: 12, sm: 6, md: 4}}>
              <AddNote/>
            </Grid>
            <Grid size= {{xs: 12, sm: 6, md: 4}}>
              <UpdateNote/>
            </Grid>
            <Grid size= {{xs: 12, sm: 6, md: 4}}>
              <DeleteNote/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}

export default NoteManagementPage