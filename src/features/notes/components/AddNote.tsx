import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/store";
import { addNewNote } from "../thunks/noteThunks";
import type { Note } from "../api/types";

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
  const dispatch = useDispatch<AppDispatch>();

  const [newName, setNewName] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState<string>("");

  const handleAddNote = () => {
    if (!newName || !newImageUrl) return;

    const newNote: Note = {
      name: newName,
      image_url: newImageUrl,
    };

    dispatch(addNewNote(newNote));

    setNewName("");
    setNewImageUrl("");
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add New Note
        </Typography>
        <Grid container spacing={2}>
          <Grid size= {{xs: 12}}>
            <TextField
              fullWidth
              label="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </Grid>
          <Grid size= {{xs: 12}}>
            <TextField
              fullWidth
              label="Image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
        <Button variant="contained" color="success" onClick={handleAddNote}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
}

export default AddNote;
