import { usePerfumeForm } from "../hooks/usePerfumeForm";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";

function DeletePerfume() {
 
  const { selectedOption, setSelectedOption, handleDelete, perfumeDropDownOptions } = usePerfumeForm();

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Delete Perfume
        </Typography>
        <Grid container spacing={2}>
          <Grid size = {{xs: 12}}>
            <Autocomplete
              options={perfumeDropDownOptions}
              getOptionLabel={(option) => option.label}
              value={selectedOption}
              onChange={(event, newValue) => setSelectedOption(newValue ?? {label: "", value: ""})}
              renderInput={(params) => <TextField {...params} label="Selected Perfume" placeholder='Search'/>}
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

export default DeletePerfume;
