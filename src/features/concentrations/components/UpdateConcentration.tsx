import { useConcentrationForm } from "../hooks/useConcentrationForm";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
} from "@mui/material";

function UpdateConcentration() {

  const { name, setName, displayName, setDisplayName, id, setId, concentrationDropdownOptions,handleUpdate } = useConcentrationForm();

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", padding: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Update Concentration
        </Typography>
        <Grid container spacing={2}>
          <Grid size = {{xs:12}}>
            <FormControl fullWidth>
              <InputLabel id="concentration-select-label">Select Concentration</InputLabel>
              <Select
                labelId="concentration-select-label"
                value={id}
                onChange={(e) => setId(e.target.value)}
                input={<OutlinedInput label="Select Concentration" />}
              >
                {concentrationDropdownOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size = {{xs:12}}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid size = {{xs:12}}>
            <TextField
              fullWidth
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
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

export default UpdateConcentration;
