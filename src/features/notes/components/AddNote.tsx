import { useNoteForm } from "../hooks/useNoteForm";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

function AddNote() {
  
  const { name, setName, imageUrl, setImageUrl, handleAdd} = useNoteForm();

  return (
    <Card sx={{ margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add New Note
        </Typography>
        <Grid container spacing={2}>
          <Grid size= {{xs: 12}}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid size= {{xs: 12}}>
            <TextField
              fullWidth
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
        <Button variant="contained" color="success" onClick={handleAdd}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
}

export default AddNote;
