import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { deleteExistingNote } from "../thunks/noteThunks";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
} from "@mui/material";

function DeleteNote() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedId, setSelectedId] = useState<string>("");

  const notes = useSelector((state: RootState) => state.note.notes);

  const dropDownOptions = notes
    .filter((n): n is (typeof n) & { _id: string } => !!n._id)
    .map((n) => ({
      value: n._id,
      label: n.name,
    }));

  const handleDeleteNote = () => {
    if (selectedId) {
      dispatch(deleteExistingNote(selectedId));
      setSelectedId("");
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Delete Note
        </Typography>
        <Grid container spacing={2}>
          <Grid size = {{xs: 12}}>
            <FormControl fullWidth>
              <InputLabel id="note-select-label">Select Note</InputLabel>
              <Select
                labelId="note-select-label"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                input={<OutlinedInput label="Select Note" />}
              >
                {dropDownOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
        <Button variant="contained" color="error" onClick={handleDeleteNote}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default DeleteNote;
