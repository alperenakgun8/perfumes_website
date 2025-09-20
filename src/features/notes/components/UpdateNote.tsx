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

function UpdateNote() {

  const { name, setName, imageUrl, setImageUrl, selectedOption, setSelectedOption, dropDownOptions, handleUpdate } = useNoteForm();

  return (
    <Card sx={{ margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Update Note
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <Autocomplete
              options={dropDownOptions}
              getOptionLabel={(option) => option.label}
              value={selectedOption}
              onChange={(event, newValue) => setSelectedOption(newValue ?? {label: "", value: ""})}
              renderInput={(params) => <TextField {...params} label="Select Note" placeholder="Search..." />}
              disableClearable={false} // true yaparsan seçimi kaldırmayı engeller
            />
          </Grid>
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid size={{xs:12}}>
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
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
      </CardActions>
    </Card>
  );
}

export default UpdateNote;
