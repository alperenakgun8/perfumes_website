import NoteCard from './NoteCard';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useNoteForm } from '../hooks/useNoteForm';

function NoteList() {

  const { notes } = useNoteForm();

  return (
    <Card sx={{ margin: '2rem auto', padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography justifySelf="center" variant="h5" gutterBottom>
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
