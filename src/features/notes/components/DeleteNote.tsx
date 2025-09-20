import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import { useNoteForm } from "../hooks/useNoteForm";

function DeleteNote() {

  const { selectedOption, setSelectedOption, dropDownOptions, handleDelete } = useNoteForm();

  return (
    <Card sx={{ margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Delete Note
        </Typography>
        <Grid container spacing={2}>
          <Grid size = {{xs: 12}}>
            <Autocomplete
              options={dropDownOptions}
              getOptionLabel={(option) => option.label}
              value={selectedOption}
              onChange={(event, newValue) => setSelectedOption(newValue ?? {label: "", value: ""})}
              renderInput={(params) => <TextField {...params} label="Selected Note" placeholder='Search'/>}
              disableClearable={false}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default DeleteNote;
