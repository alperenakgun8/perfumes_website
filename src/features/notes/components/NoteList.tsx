import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../app/store';
import { fetchNotes } from '../thunks/noteThunks';
import NoteCard from './NoteCard';

import { Card, CardContent, Typography, Grid } from '@mui/material';

function NoteList() {
  const dispatch = useDispatch<AppDispatch>();

  const notes = useSelector((state: RootState) => state.note.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Notes List
        </Typography>

        {notes.length === 0 ? (
          <Typography color="text.secondary">No notes found</Typography>
        ) : (
          <Grid container spacing={1} justifyContent="center">
            {notes.map((n) => (
              <Grid key={n._id}>
                <NoteCard name={n.name} image_url={n.image_url} />
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default NoteList;
