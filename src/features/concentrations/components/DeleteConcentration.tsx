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
  Button,
  OutlinedInput,
} from "@mui/material";
import { useConcentrationForm } from "../hooks/useConcentrationForm";

function DeleteConcentration() {

  const { id, setId, concentrationDropdownOptions, handleDelete} = useConcentrationForm();

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Delete Concentration
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs:12 }}>
            <FormControl fullWidth>
              <InputLabel id="concentration-select-label">Concentration</InputLabel>
              <Select
                labelId="concentration-select-label"
                value={id}
                onChange={(e) => setId(e.target.value)}
                input={<OutlinedInput label="Concentration" />}
              >
                {concentrationDropdownOptions.map((option) => (
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
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default DeleteConcentration;
