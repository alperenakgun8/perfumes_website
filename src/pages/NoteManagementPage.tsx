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
  return (
      <Card sx={{ maxWidth: '100%', margin: "2rem auto", padding: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{xs: 12}}>
              <NoteList/>
            </Grid>
            <Grid size= {{xs: 12, sm: 4}}>
              <AddNote/>
            </Grid>
            <Grid size= {{xs: 12, sm: 4}}>
              <UpdateNote/>
            </Grid>
            <Grid size= {{xs: 12, sm: 4}}>
              <DeleteNote/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
}

export default NoteManagementPage